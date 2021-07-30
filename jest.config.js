module.exports = {
  rootDir  : './src',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '../jest/setup.ts',
    '../jest/register.ts',
  ],
};
