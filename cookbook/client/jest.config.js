const config = {
  verbose: true,
  setupFilesAfterEnv: ['./src/setupTests.js'],
  transform: {
    '^.+\\.(js|jsx|tsx|ts)$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-transform-css',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'tsx', 'ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
  },
};

module.exports = config;
