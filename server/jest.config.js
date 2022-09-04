module.exports = {
    roots: ['<rootDir>/src'], // jest considers `server/src` as the root path now instead of `/backend`
    testEnvironment: 'node',
    globalTeardown: '<rootDir>/src/testUtils/globalTearDown.ts',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testTimeout: 12000,
  };