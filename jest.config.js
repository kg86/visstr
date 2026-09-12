module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "node_modules/(color-convert|color-name)/.+\\.js$": [
      "ts-jest",
      {
        isolatedModules: true,
        tsconfig: { allowJs: true, module: "CommonJS" },
      },
    ],
  },
  transformIgnorePatterns: ["/node_modules/(?!(color-convert|color-name))"],
};
