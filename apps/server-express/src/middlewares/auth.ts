import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from 'apps/server-express/config';
import { BadRequestError } from '../helpers/error-builder';

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

      console.log(decodedJWT);

      req['user'] = decodedJWT;
      next();
    });
  } catch (error) {
    // Let Express handle the error for now:
    next(error);
  }
};
