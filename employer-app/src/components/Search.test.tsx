import { render, screen, fireEvent } from "@testing-library/react";
import Search from "../components/Search";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store"; // ✅ Use redux-mock-store
import { SEARCH_EMPLOYEES_REQUEST } from "../redux/actions/searchActions";
import { useDispatch } from "react-redux";

// Create a mock Redux store
const mockStore = configureMockStore([]);
const store = mockStore({});

vi.mock("react-redux", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

describe("Search Component", () => {
  let mockDispatch: vi.Mock;

  beforeEach(() => {
    mockDispatch = vi.fn();
    (useDispatch as vi.Mock).mockReturnValue(mockDispatch);
    store.clearActions();
  });

  test("renders the search component", () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    const searchElement = screen.getByTestId("search");
    expect(searchElement).toBeInTheDocument();
  });

  test("dispatches action on submit button click", () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const inputElement = screen.getByPlaceholderText(
      "Search by ID, Name, Contact No, or Address"
    );
    const buttonElement = screen.getByRole("button", { name: /submit/i });

    // Type a search term
    fireEvent.change(inputElement, { target: { value: "Saravana Karthick" } });

    // Click submit button
    fireEvent.click(buttonElement);

    // Ensure dispatch is called with correct action
    expect(mockDispatch).toHaveBeenCalledWith(
      SEARCH_EMPLOYEES_REQUEST("Saravana Karthick")
    );
  });
});
