module.exports = {
    roots: ['<rootDir>/server'], // jest considers `backend/server` as the root path now instead of `/backend`
    testEnvironment: 'node',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testTimeout: 12000,
  };