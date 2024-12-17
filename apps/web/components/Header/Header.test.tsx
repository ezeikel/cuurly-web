import { render, screen } from "@testing-library/react";
import Header from "./Header";

// Mock the Nav component
jest.mock("../Nav/Nav", () => ({
  __esModule: true,
  default: () => <nav data-testid="mock-nav">Mock Nav</nav>,
}));

describe("Header", () => {
  it("renders with default className", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Header className="custom-class" />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("custom-class");
  });
});
