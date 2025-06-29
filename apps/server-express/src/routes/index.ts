import { Router } from 'express';
import { RouterInterface } from './../data-structures/interfaces/router';
import { IndexController } from './../controllers/index';

export class IndexRoute implements RouterInterface {
  // Set RouterInterface required properties:
  public path: string = '';
  public router: Router = Router();

  // Set controllers and/or middleware for handling route interactions:
  controller = new IndexController();

  constructor() {
    this.registerRouteHandlers();
  }

  /**
   * [Path mismatching issues]:
   * It is very important to be careful when registering routes as they are matched from top-down.
   * That means when registering paths in the following order:
   *  (1):'/api/:id'
   *  (2):'/api/users'
   * we will match (1):'/api/:id' when seding a request to '/api/users' and the req.params.id would be 'users'.
   * If we switch the order '/api/users' would explicitly match (2):'/api/users'
   *
   * [Attaching the handlers]:
   * Every handler callback argument is called in the order it was passed in and inherits the
   * following parameters: (req: Request, res: Response, next: NextFunction) => {}
   *
   * Each handler callback requires a `next()` call inside the callback logic to invoke the next handler.
   * Knowing this we can easily implement middleware to hit and verify before continuing.
   */
  private registerRouteHandlers() {
    // GET:
    this.router.get(this.path, this.controller.index);
    this.router.get(this.path + '/api', this.controller.indexApi);
    // POST:
    // PUT:
    // PATCH:
    // DELETE:
  }
}
