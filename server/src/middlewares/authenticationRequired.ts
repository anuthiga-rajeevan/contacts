import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import ErrorResponse from '../utils/ErrorResponse';

// export const authenticationRequired = async () => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     if (!req.headers.authorization) {
//       return next(new ErrorResponse('Unauthorized', 400));
//     }
//   };
// };

export default async function authenticationRequired(
  req,
  res: Response,
  next: NextFunction,
) {
  if (!req.headers.authorization) {
    return next(new ErrorResponse('Unauthorized', 401));
  }
  try {
    const user = jwt.verify(req.headers.authorization, process.env.TOKEN_KEY || 'token_key');
    req.user = user;
    next();
  } catch (err) {
    return next(new ErrorResponse(err.message, 401));
  }
}
