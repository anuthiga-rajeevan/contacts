// @ts-nocheck
import ErrorResponse from '../utils/ErrorResponse';
import { validator } from './validator';

const next = jest.fn(() => undefined);
const json = jest.fn(() => undefined);
const res = {
  status: jest.fn(() => ({
    json,
  })),
};

describe('validator', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should throw proper error message when given validator not exist', () => {
    validator('dummyValidator')({}, {}, next);
    expect(next).toBeCalledWith(new ErrorResponse("'dummyValidator' validator is not exist", 400));
  });
  it('should throw validation error message when req.body not fulfill given schema', () => {
    validator('login')({ body: {} }, {}, next);
    expect(next).toBeCalledWith(new ErrorResponse('ValidationError: "email" is required', 400));
  });
  it('should call next function when req.body fulfilled the given schema ', () => {
    const req = {
      body: { email: 'Hello@GMAIL.com', password: 'dummyPassword' },
    };
    validator('login')(req, {}, next);
    expect(req.body).toStrictEqual({email: 'hello@gmail.com', password: 'dummyPassword'});
    expect(next).toHaveBeenCalled();
  });
});
