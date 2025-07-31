export default {
  test: {
    globals: true,
    environment: "node",
    coverage: {
      reporter: ["text", "html"],
      exclude: ["**/dto/**", "**/utils/logger.js"],
    },
    include: ["tests/**/*.test.js"],
  },
};
