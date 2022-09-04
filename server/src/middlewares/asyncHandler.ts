/* This middleware is used to wrap a controller function in a try catch block.
    The catch block will use the error handler middleware.
    eg. const controllerName = asyncHandler(async (req, res, next) => {
        <Controller logic>
    });

    Usage of this middleware is optional, so it does not override default behaviour.
    i.e. Using a try catch block is still possible
*/

import { NextFunction, Request, Response } from 'express';

const asyncHandler = (fn) => (req: Request, res: Response, next: NextFunction): Promise<void> =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
