// @ts-nocheck
import errorHandler from './errorHandler';

const next = jest.fn(() => undefined);
const json = jest.fn(() => undefined);
const res = {
  status: jest.fn(() => ({
    json,
  })),
};

describe('errorHandler', () => {
  it('should return proper error message when mongoose cast error thrown', () => {
    const err = {
      name: 'CastError',
      path: 'user_id',
    };

    errorHandler(err, {}, res, next);
    expect(res.status).toHaveBeenNthCalledWith(1, 400);
    expect(json).toHaveBeenNthCalledWith(1, {
      success: false,
      error: 'ID is not a valid MongoDB Object ID',
    });
  });

  it('should return the exact error message when mongoose cast error thrown but path is not _id or user_id', () => {
    const err = {
      name: 'CastError',
      path: 'contact_id',
      message: 'error message',
    };

    errorHandler(err, {}, res, next);
    expect(res.status).toHaveBeenNthCalledWith(2, 400);
    expect(json).toHaveBeenNthCalledWith(2, {
      success: false,
      error: 'error message',
    });
  });

  it('should return proper error message when mongoose duplicate key error thrown', () => {
    const err = {
      code: 11000,
    };

    errorHandler(err, {}, res, next);
    expect(res.status).toHaveBeenNthCalledWith(3, 400);
    expect(json).toHaveBeenNthCalledWith(3, {
      success: false,
      error: 'Duplicate field value entered',
    });
  });

  it('should return proper error message when mongoose validation error thrown', () => {
    const err = {
      name: 'ValidationError',
      errors: [
        { message: 'Name is required!' },
        { message: 'Email is required!' },
        { message: 'Password is required!' },
      ],
    };

    errorHandler(err, {}, res, next);
    expect(res.status).toHaveBeenNthCalledWith(4, 400);
    expect(json).toHaveBeenNthCalledWith(4, {
      success: false,
      error: 'Name is required!,Email is required!,Password is required!',
    });
  });
});
