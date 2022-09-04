import { Request, Response, NextFunction } from 'express';
import logger from '../common/logger';
import ErrorResponse from '../utils/ErrorResponse';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for dev
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack.red);
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    if (err.path === '_id' || err.path === 'user_id') {
      const message = 'ID is not a valid MongoDB Object ID';
      error = new ErrorResponse(message, 400);
    } else {
      const message = err.message;
      error = new ErrorResponse(message, 400);
    }
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((value: any) => value.message);
    error = new ErrorResponse(message, 400);
  }

  logger.error(error.message || 'Server Error');

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

export default errorHandler;
