import { Router } from 'express';
import { RouterInterface } from './../data-structures/interfaces/router';
import { AuthController } from './../controllers/auth';

export class AuthRoute implements RouterInterface {
  public path: string = '/api/login';
  public router: Router = Router();
  private controller = new AuthController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(this.path, this.controller.login);
  }
}
