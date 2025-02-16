import { render, screen } from "@testing-library/react";
import Pagination from "../components/Pagination";
import { describe, expect, test } from "vitest";

describe("Pagination Component", () => {
  test("renders the pagination component", () => {
    render(<Pagination />);
    const paginationElement = screen.getByTestId("pagination");
    expect(paginationElement).toBeInTheDocument();
  });

  test("renders the 'Prev' button as disabled initially", () => {
    render(<Pagination />);
    const prevButton = screen.getByRole("button", { name: /previous page/i });
    expect(prevButton).toBeDisabled();
  });

  test("renders the correct number of page buttons", () => {
    render(<Pagination />);
    const pageButtons = screen.getAllByRole("button", { name: /go to page/i });
    expect(pageButtons).toHaveLength(5);
  });

  test("checks if the first page is active", () => {
    render(<Pagination />);
    const activePage = screen.getByRole("button", { name: /go to page 1/i });
    expect(activePage).toHaveClass("active");
  });

  test("renders the 'Next' button as enabled", () => {
    render(<Pagination />);
    const nextButton = screen.getByRole("button", { name: /next page/i });
    expect(nextButton).toBeEnabled();
  });
});
