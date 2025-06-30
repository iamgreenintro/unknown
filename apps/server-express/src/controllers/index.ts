import { NextFunction, Request, Response } from 'express';

/**
 * A general rule of thumb for a controller is that it handles logic coming in via a http request.
 * The logic may include req.body validation or anything else that may interfere with the call to the service.
 */
export class IndexController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.redirect(307, 'api');
      console.log('[GET]:\t\t' + req.url);
    } catch (error: unknown) {
      next(error);
    }
  };

  public indexApi = (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('[GET]:\t\t' + req.url);
      res.status(200).json({ message: 'Hello API' });
    } catch (error: unknown) {
      next(error);
    }
  };
}
