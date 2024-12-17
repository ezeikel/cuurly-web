import "@testing-library/jest-dom";

// Mock next-auth
jest.mock("next-auth", () => ({
  ...jest.requireActual("next-auth"),
  signIn: jest.fn(),
  signOut: jest.fn(),
  useSession: jest.fn(() => ({
    data: null,
    status: "unauthenticated",
  })),
}));

// Mock next-auth/react
jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  signIn: jest.fn(),
  signOut: jest.fn(),
  useSession: jest.fn(() => ({
    data: null,
    status: "unauthenticated",
  })),
}));

// Mock the auth module
jest.mock("./auth", () => ({
  auth: jest.fn(() => null),
  handlers: {
    GET: jest.fn(),
    POST: jest.fn(),
  },
}));

// Mock next/router
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    pathname: "/",
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});
