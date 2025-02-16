import { render, screen, fireEvent } from "@testing-library/react";
import Search from "../components/Search";
import { describe, expect, test } from "vitest";

describe("Search Component", () => {
  test("renders the search component", () => {
    render(<Search />);
    const searchElement = screen.getByTestId("search");
    expect(searchElement).toBeInTheDocument();
  });

  test("has an accessible label for the input field", () => {
    render(<Search />);
    const input = screen.getByLabelText(/search/i);
    expect(input).toBeInTheDocument();
  });

  test("renders the input field with the correct placeholder", () => {
    render(<Search />);
    const inputElement = screen.getByPlaceholderText("Enter the name");
    expect(inputElement).toBeInTheDocument();
  });

  test("renders the submit button", () => {
    render(<Search />);
    const buttonElement = screen.getByRole("button", { name: /submit/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test("allows typing in the input field", () => {
    render(<Search />);
    const inputElement = screen.getByPlaceholderText("Enter the name");

    fireEvent.change(inputElement, { target: { value: "John Doe" } });

    expect(inputElement).toHaveValue("John Doe");
  });

  test("allows clicking the submit button", () => {
    render(<Search />);
    const buttonElement = screen.getByRole("button", { name: /submit/i });

    fireEvent.click(buttonElement);

    expect(buttonElement).toBeEnabled();
  });
});
