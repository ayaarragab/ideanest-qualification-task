import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import User from '../models/user';
import Organization from '../models/organization';
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
      return;
    }
    next();
  } catch (error) {
    console.error(error);
  }
};

export const orgExists: RequestHandler = async (request, response, next) => {
  try {
    const isExist = await Organization.findOne({ name: request.body.name, description: request.body.description });
    if (isExist) {
      response.status(400).json({ message: 'Organization already exists!' });
      return;
    }
    next();
  } catch (error) {
    console.error(error);
  }
};
