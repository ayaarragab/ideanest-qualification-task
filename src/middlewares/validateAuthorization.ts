import { NextFunction, Request, Response } from 'express';
import { verifyJWT } from '../utils/authHelpers';
import serverErrorsHandler from '../utils/errorHandlers';



export const isAuthorized = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    const bearer = request.headers.authorization;

    if (!bearer) {
      response.status(401).json({
        status: 'error',
        message: 'An error occurred.',
        error: {
          code: 401,
          details: 'You are not authorized to access this page!',
        },
      });
      return;
    }

    const token = bearer.split(' ')[1];

    if (!token) {
      response.status(400).json({
        status: 'error',
        message: 'An error occurred.',
        error: {
          code: 400,
          details: 'Invalid token',
        },
      });
      return;
    }

    try {
      const user = await verifyJWT(token);

      if (user) {
        (request as any).user = user; // Type assertion if `user` property isn't defined in `Request`
        next();
      } else {
        response.status(400).json({
          status: 'error',
          message: 'An error occurred.',
          error: {
            code: 400,
            details: 'Invalid token',
          },
        });
      }
    } catch (error) {
      response.status(400).json({
        status: 'error',
        message: 'An error occurred.',
        error: {
          code: 400,
          details: 'Invalid token',
        },
      });
    }
  } catch (error) {
    serverErrorsHandler(response, error);
  }
};
