import { render, screen } from "@testing-library/react";
import App from "../App";
import { expect, test } from "vitest";

test("renders Employer Application text", () => {
  render(<App />);
  const textElement = screen.getByText(/Employer Application/i);
  expect(textElement).toBeInTheDocument();
});
