import { Request, Response, NextFunction } from 'express';
import ErrorResponse from '../utils/ErrorResponse';
import Validators from '../validators/index.validators';

export const validator = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // if validator not exist, throw err
    if (!Validators.hasOwnProperty(schema)) {
      return next(new ErrorResponse(`'${schema}' validator is not exist`, 400));
    }
    const { error, value } = Validators[schema].validate(req.body);
    if (error) {
      return next(new ErrorResponse(error, 422));
    }
    req.body = value;
    next();
  };
};
