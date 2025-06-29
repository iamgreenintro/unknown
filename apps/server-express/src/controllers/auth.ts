import { AuthService } from '../services/auth';
import { ResponseInterface } from '../data-structures/interfaces/response';
import { NextFunction, Request, Response } from 'express';
import { UserValidator } from '@unknown/validators';

export class AuthController {
  private readonly authService: AuthService = new AuthService();
  private readonly userValidator: UserValidator = new UserValidator();

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { username, password } = req.body;

      // Stop if password or username is invalid:
      this.userValidator.throwErrorOnInvalidNameOrPassword({
        username,
        password,
      });

      const serviceResponse = await this.authService.login({
        username: username,
        password: password,
      });

      if (serviceResponse.error) {
        throw new Error(serviceResponse.message);
      } else {
        // SUCCESS: Credentials were authenticated.
        res.status(serviceResponse.code).json(serviceResponse);
      }
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
