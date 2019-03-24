module.exports = {
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['node_modules', 'dist'],
  coveragePathIgnorePatterns: ['node_modules', 'dist'],
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'temperature unit-test result',
        outputPath: 'unitTestResult.html',
        includeFailureMsg: true,
        includeConsoleLog: true,
        dateFormat: 'dd-mmm-yy HH:MM:ss',
      },
    ],
  ],
};
