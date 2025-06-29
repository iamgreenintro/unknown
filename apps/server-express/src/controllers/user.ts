import { NextFunction, Request, Response } from 'express';
import { UserService } from './../services/user';
import { ResponseInterface } from './../data-structures/interfaces/response';
import { scrypt, randomBytes } from 'crypto';
import { UserValidator } from '@unknown/validators';
import { scryptOptions } from '../services/auth';

export class UserController {
  private readonly userValidator = new UserValidator();
  private userService: UserService = new UserService();

  public getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const serviceResponse = await this.userService.getUsers();
      res.status(serviceResponse.code).json(serviceResponse);
    } catch (error) {
      if (error instanceof Error) {
        const errorResponse: ResponseInterface = {
          data: null,
          error: true,
          message: error.message,
          code: 400,
        };
        res.status(errorResponse.code).json(errorResponse);
      } else {
        // Let Express handle the error for now:
        next(error);
      }
    }
  };

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { password, username } = req.body;

      // Stop if password or username is invalid:
      this.userValidator.throwErrorOnInvalidNameOrPassword({
        password,
        username,
      });

      // https://nodejs.org/docs/latest-v20.x/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback
      // https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-132.pdf
      const salt = randomBytes(32).toString('hex');
      const derivedKey = await new Promise<Buffer>((resolve, reject) => {
        scrypt(
          Buffer.from(password, 'utf-8'),
          Buffer.from(salt, 'utf-8'),
          64,
          scryptOptions,
          (err, key) => {
            if (err) reject(err);
            else resolve(key);
          }
        );
      });

      const userToCreate = {
        password: derivedKey.toString('hex'),
        username: username,
        salt: salt,
      };

      const serviceResponse = await this.userService.createUser(userToCreate);

      if (serviceResponse.error) {
        throw new Error(serviceResponse.message);
      }
      // SUCCESS: A new user was created with given credentials.
      res.status(serviceResponse.code).json(serviceResponse);
    } catch (error) {
      if (error instanceof Error) {
        const errorResponse: ResponseInterface = {
          data: null,
          error: true,
          message: error.message,
          code: 400,
        };
        res.status(errorResponse.code).json(errorResponse);
      } else {
        // Let Express handle the error for now:
        next(error);
      }
    }
  };
}
