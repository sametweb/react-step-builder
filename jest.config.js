// The moduleNameMapper setting tells Jest how to interpret files with different extensions. In this case we simply need to point it at the empty file we just created.
module.exports = {
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/tests/styleMock.js",
  },
};
