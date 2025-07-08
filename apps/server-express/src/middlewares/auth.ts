import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from 'apps/server-express/config';
import { BadRequestError } from '../helpers/error-builder';
import { ResponseBuilder } from '../helpers/response-builder';

export const checkJWT = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      throw new BadRequestError('Authorization header is missing.');
    }

    const token: string = header.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (error, decodedJWT) => {
      if (error) {
        throw new BadRequestError('Unable to verify JWT signature.');
      }

      req['user'] = decodedJWT;
      next();
    });
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof BadRequestError) {
      res.status(error.code).json(
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
