export default {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    },
    moduleNameMapper: {
      "\\.(jpg|jpeg|png|svg|css|scss)$": "<rootDir>/__mocks__/fileMock.js"
    },
    setupFiles: ["./jest.setup.js"]
  };