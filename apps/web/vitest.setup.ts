import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

/**
 * Global setup for @helix/web Vitest runs.
 * Extends Vitest matchers and cleans up the DOM between component tests.
 */
afterEach(() => {
  cleanup();
});
