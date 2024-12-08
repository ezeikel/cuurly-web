import "@testing-library/react-native/extend-expect";

// Mock expo-router
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
}));

// Reset mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
});
