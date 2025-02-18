import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";
import { describe, it, expect } from "vitest";

describe("Footer Component", () => {
  it("renders correctly", () => {
    render(<Footer />);

    // Check if footer element is present
    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toBeInTheDocument();
  });

  it("displays the correct copyright text", () => {
    render(<Footer />);

    // Check if the copyright text is displayed
    expect(screen.getByText(/Copyright © WestPac/i)).toBeInTheDocument();
  });
});
