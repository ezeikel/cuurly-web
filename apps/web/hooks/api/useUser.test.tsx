import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getCurrentUser } from "@/app/actions";
import useUser from "./useUser";

jest.mock("@/app/actions", () => ({
  getCurrentUser: jest.fn(),
}));

describe("useUser", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("should fetch user data successfully", async () => {
    const mockUser = {
      id: "1",
      email: "test@example.com",
      name: "Test User",
    };

    (getCurrentUser as jest.Mock).mockResolvedValueOnce(mockUser);

    const { result } = renderHook(() => useUser(), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockUser);
  });

  it("should handle null user response", async () => {
    (getCurrentUser as jest.Mock).mockResolvedValueOnce(null);

    const { result } = renderHook(() => useUser(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeNull();
  });

  it("should handle error state", async () => {
    // Mock the getCurrentUser to throw an error
    (getCurrentUser as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch"),
    );

    const { result } = renderHook(() => useUser(), { wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });
});
