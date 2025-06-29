import { Router } from 'express';
import { RouterInterface } from './../data-structures/interfaces/router';
import { UserController } from './../controllers/user';

export class UserRoute implements RouterInterface {
  public path: string = '/api/users';
  public router: Router = Router();
  private controller = new UserController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.path, this.controller.getUsers);
    this.router.post(this.path + '/create', this.controller.createUser);
  }
}
