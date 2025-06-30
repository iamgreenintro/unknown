import { scrypt, ScryptOptions } from 'crypto';
import { UserModel } from '../data-structures/models/mongo/user';
import { ResponseInterface } from '../data-structures/interfaces/response';
import { ResponseBuilder } from '../helpers/response-builder';
import { BadRequestError, UnauthorizedError } from '../helpers/error-builder';

export const scryptOptions: ScryptOptions = {
  // Tweak for ideal duration
  blockSize: 64,
  parallelization: 2,
  maxmem: 256 * 1024 * 1024, // error out on > 256mb
};

export class AuthService implements ResponseBuilder {
  public async login(payload: {
    username: string;
    password: string;
  }): Promise<ResponseInterface> {
    try {
      if (!payload || !payload.username || !payload.password) {
        throw new BadRequestError(`Missing credentials`);
      }

      const user = await UserModel.findOne({
        username: payload.username,
      }).lean();

      // Username not found:
      if (!user) {
        throw new BadRequestError(`Username does not exist.`);
      }

      const isValidPassword = await this.isHashedPasswordMatching(
        payload.password,
        user.password,
        user.salt
      );

      // Incorrect password but username exists:
      if (!isValidPassword) {
        throw new UnauthorizedError(
          `Invalid username and password combination.`
        );
      }

      return ResponseBuilder.successResponse(user, {
        message: 'Successfully logged in.',
      });

      // Catch failures:
    } catch (error: unknown) {
      if (error instanceof BadRequestError || error instanceof Error) {
        return ResponseBuilder.errorResponse({
          message: error.message,
        });
      }

      if (error instanceof BadRequestError) {
        return ResponseBuilder.errorResponse({
          message: error.message,
          code: error.code,
        });
      }

      if (error instanceof UnauthorizedError) {
        return ResponseBuilder.errorResponse({
          message: error.message,
          code: ResponseBuilder.ERROR_CODES.UNAUTHORIZED,
        });
      }

      return ResponseBuilder.errorResponse({
        message: 'Unknown error occured while attempting to login.',
      });
    }
  }

  public async findUser(userID: string): Promise<ResponseInterface> {
    try {
      if (!userID) {
        throw new BadRequestError(
          'No userID provided. Can not continue with finding user.'
        );
      }
      const user = await UserModel.findById(userID);

      if (!user) {
        throw new BadRequestError(`User with id ${userID} does not exist.`);
      }

      return ResponseBuilder.successResponse({
        message: 'Successfully retrieved user.',
      });

      // Catch failures:
    } catch (error: unknown) {
      if (error instanceof Error) {
        return ResponseBuilder.errorResponse({
          message: error.message,
        });
      }

      if (error instanceof BadRequestError) {
        return ResponseBuilder.errorResponse({
          message: error.message,
          code: error.code,
        });
      }

      return ResponseBuilder.errorResponse({
        message: 'Error occured while attempting to find user.',
      });
    }
  }

  private isHashedPasswordMatching(
    password: string,
    hashedPassword: string,
    salt: string
  ) {
    return new Promise((resolve, reject) => {
      scrypt(
        Buffer.from(password),
        Buffer.from(salt),
        64,
        scryptOptions,
        async (err, derivedKey) => {
          if (err) {
            reject(err);
          } else {
            // true if passwords match
            resolve(hashedPassword === derivedKey.toString('hex'));
          }
        }
      );
    });
  }
}
