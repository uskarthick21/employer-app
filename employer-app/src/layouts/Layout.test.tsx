import { render, screen } from "@testing-library/react";
import Layout from "../layouts/Layout";
import { describe, it, expect, vi } from "vitest";

vi.mock("../components/Header", () => ({
  __esModule: true,
  default: () => <header data-testid="mock-header">Mock Header</header>,
}));

vi.mock("../components/Footer", () => ({
  __esModule: true,
  default: () => <footer data-testid="mock-footer">Mock Footer</footer>,
}));

describe("Layout Component", () => {
  it("renders Header and Footer components", () => {
    render(
      <Layout>
        <p>Test Child Content</p>
      </Layout>
    );

    expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    expect(screen.getByTestId("mock-footer")).toBeInTheDocument();
  });

  it("renders children inside the main container", () => {
    render(
      <Layout>
        <p>Test Child Content</p>
      </Layout>
    );

    expect(screen.getByText("Test Child Content")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("wraps content inside a container div", () => {
    render(
      <Layout>
        <p>Test Child Content</p>
      </Layout>
    );

    expect(screen.getByRole("main").closest(".container")).toBeInTheDocument();
  });
});
