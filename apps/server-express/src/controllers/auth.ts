import { AuthService } from '../services/auth';
import { ResponseInterface } from '../data-structures/interfaces/response';
import { NextFunction, Request, Response } from 'express';
import { UserValidator } from '@unknown/validators';
import { ResponseBuilder } from '../helpers/response-builder';

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
        username,
        password,
      });

      res.status(serviceResponse.code).json(serviceResponse);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res.status(400).json(
          ResponseBuilder.errorResponse({
            message: error.message,
          })
        );
      } else {
        // Let Express handle the error for now:
        next(error);
      }
    }
  };
}
