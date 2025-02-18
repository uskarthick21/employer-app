import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { describe, it, expect, vi } from "vitest";
import App from "./App";
import { companyReducer } from "./redux/slice/company/companySlice";
import { searchReducer } from "./redux/slice/search/searchSlice";
import { sortReducer } from "./redux/slice/sort/sortSlice";

vi.mock("./components/Layout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="layout">{children}</div>
  ),
}));

vi.mock("./components/Search", () => ({
  __esModule: true,
  default: () => <div data-testid="search" />,
}));

vi.mock("./components/Company", () => ({
  __esModule: true,
  default: () => <div data-testid="company" />,
}));

vi.mock("./components/Pagination", () => ({
  __esModule: true,
  default: () => <div data-testid="pagination" />,
}));

const createMockStore = (initialState: any) =>
  configureStore({
    reducer: {
      company: companyReducer,
      search: searchReducer,
      sort: sortReducer,
    },
    preloadedState: initialState,
  });

describe("App Component", () => {
  it("renders the Layout component", () => {
    render(
      <Provider
        store={createMockStore({
          company: { data: null, isLoading: false, error: null },
          search: { data: [], isLoading: false, error: null },
          sort: { field: "", order: "asc" },
        })}
      >
        <App />
      </Provider>
    );

    expect(screen.getByTestId("layout")).toBeInTheDocument();
  });

  it("renders Search, Company, and Pagination inside Layout", () => {
    render(
      <Provider
        store={createMockStore({
          company: { data: null, isLoading: false, error: null },
          search: { data: [], isLoading: false, error: null },
          sort: { field: "", order: "asc" },
        })}
      >
        <App />
      </Provider>
    );

    expect(screen.getByTestId("search")).toBeInTheDocument();
    expect(screen.getByTestId("company")).toBeInTheDocument();
  });
});
