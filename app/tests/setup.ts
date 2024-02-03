import { afterAll, afterEach, beforeAll, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { server } from "./mocks/server";

// extends Vitest's expect method with methods from react-testing-library

// runs a cleanup after each test case
afterEach(() => {
  vi.resetAllMocks()
});

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
