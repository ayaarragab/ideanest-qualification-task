import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import User from '../models/user';
import { RequestHandler } from 'express';

export const handleValidationErrors: RequestHandler = (request: Request, response: Response, next: NextFunction) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
      response.status(400).json({ errors: errors.array() });
      return;
  }
  next();
};

export const emailExists: RequestHandler = async (request, response, next) => {
  try {
    const isExist = await User.findOne({ email: request.body.email });
    if (isExist) {
      response.status(400).json({ message: 'Email already exists!' });
      return; // Ensures consistent `void` return type
    }
    next();
  } catch (error) {
    console.error(error);
  }
};
