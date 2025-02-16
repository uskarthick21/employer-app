import { render, screen } from "@testing-library/react";
import App from "../App";
import { describe, it, expect, vi } from "vitest";

vi.mock("../layouts/Layout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-layout">{children}</div>
  ),
}));

vi.mock("../components/Search", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-search">Mock Search</div>,
}));

vi.mock("../components/Company", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-company">Mock Company</div>,
}));

vi.mock("../components/Pagination", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-pagination">Mock Pagination</div>,
}));

describe("App Component", () => {
  it("renders the Layout component", () => {
    render(<App />);
    expect(screen.getByTestId("mock-layout")).toBeInTheDocument();
  });

  it("renders Search, Company, and Pagination inside Layout", () => {
    render(<App />);

    expect(screen.getByTestId("mock-search")).toBeInTheDocument();
    expect(screen.getByTestId("mock-company")).toBeInTheDocument();
    expect(screen.getByTestId("mock-pagination")).toBeInTheDocument();
  });
});
