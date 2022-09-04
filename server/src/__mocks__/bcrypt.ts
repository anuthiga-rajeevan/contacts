export default {
  genSalt: jest.fn(() => Promise.resolve('dummySalt')),
  hash: jest.fn(() => Promise.resolve('dummyHash')),
};
