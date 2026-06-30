import { defineConfig } from "vitest/config";
import path from "node:path";

/**
 * Vitest configuration for @helix/mobile utility and logic tests.
 * React Native component tests can be added later with @testing-library/react-native.
 */
export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "."),
    },
  },
  test: {
    name: "@helix/mobile",
    environment: "node",
    include: ["**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", ".expo"],
  },
});
