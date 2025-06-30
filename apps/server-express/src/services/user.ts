import { ResponseInterface } from '../data-structures/interfaces/response';
import { UserModel } from '../data-structures/models/mongo/user';
import { BadRequestError } from '../helpers/error-builder';
import { ResponseBuilder } from '../helpers/response-builder';

export class UserService {
  public async getUsers(): Promise<ResponseInterface> {
    try {
      const users = await UserModel.find();

      if (!!users) {
        throw new BadRequestError(
          'Something went wrong while trying to retrieve users from the collection.'
        );
      }

      return ResponseBuilder.successResponse(users, {
        message: 'A collection of users was successfully retrieved.',
      });

      // Catch errors:
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
        message: 'Error occured while attempting to retrieve users.',
      });
    }
  }

  public async createUser(payload: any): Promise<ResponseInterface> {
    try {
      const createdUser = await UserModel.create(payload);

      if (!createdUser) {
        throw new BadRequestError(
          'Something went wrong while trying to create a new user.'
        );
      }

      return ResponseBuilder.successResponse(createdUser, {
        message: 'A new user was successfully created',
      });

      // Catch errors:
    } catch (error: any) {
      if (error.code === 11000) {
        // Duplicate key encountered, user most likely exists already.
        return ResponseBuilder.errorResponse({
          message: 'Username already exists.',
          code: ResponseBuilder.ERROR_CODES.BAD_REQUEST, // instead of 409 CONFLICT due to security
        });
      }

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
        message: 'Error occured while attempting to create a new user.',
      });
    }
  }
}
