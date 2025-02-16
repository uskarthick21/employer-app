import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Company from "../components/Company";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { companyReducer } from "../redux/slice/company/companySlice";
import useDebounceResize from "../hooks/useDebounceResize";

vi.mock("../hooks/useDebounceResize", () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock("../components/Card", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-card" />,
}));

const createMockStore = (initialState: any) =>
  configureStore({
    reducer: { company: companyReducer },
    preloadedState: { company: initialState },
  });

describe("Company Component", () => {
  beforeEach(() => {
    (useDebounceResize as vi.Mock).mockReturnValue(false); // Default to Desktop Mode
  });

  it("renders loading state when isLoading is true", () => {
    render(
      <Provider
        store={createMockStore({ data: null, isLoading: true, error: null })}
      >
        <Company />
      </Provider>
    );

    expect(screen.getByText("...loading")).toBeInTheDocument();
  });

  it("renders error message when error is present", () => {
    render(
      <Provider
        store={createMockStore({
          data: null,
          isLoading: false,
          error: "Error fetching employees",
        })}
      >
        <Company />
      </Provider>
    );

    expect(screen.getByText("Error on Employees data")).toBeInTheDocument();
  });

  it("renders 'No Data' when no employees are available", () => {
    render(
      <Provider
        store={createMockStore({
          data: { employees: [] },
          isLoading: false,
          error: null,
        })}
      >
        <Company />
      </Provider>
    );

    expect(screen.getByText("No Data")).toBeInTheDocument();
  });

  it("renders correct number of Card components when employees exist", () => {
    const mockEmployees = [
      { id: "E123", firstName: "Saravana", lastName: "Karthick" },
      { id: "E124", firstName: "kiran", lastName: "Raj" },
    ];

    render(
      <Provider
        store={createMockStore({
          data: { employees: mockEmployees },
          isLoading: false,
          error: null,
        })}
      >
        <Company />
      </Provider>
    );

    expect(screen.getAllByTestId("mock-card")).toHaveLength(2);
  });

  it("renders table header when isMobile is false", () => {
    (useDebounceResize as vi.Mock).mockReturnValue(false); // Desktop mode

    render(
      <Provider
        store={createMockStore({
          data: { employees: [] },
          isLoading: false,
          error: null,
        })}
      >
        <Company />
      </Provider>
    );

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Contact No")).toBeInTheDocument();
    expect(screen.getByText("Address")).toBeInTheDocument();
  });

  it("does not render table header when isMobile is true", () => {
    (useDebounceResize as vi.Mock).mockReturnValue(true); // Mobile mode

    render(
      <Provider
        store={createMockStore({
          data: { employees: [] },
          isLoading: false,
          error: null,
        })}
      >
        <Company />
      </Provider>
    );

    expect(screen.queryByText("ID")).not.toBeInTheDocument();
    expect(screen.queryByText("Name")).not.toBeInTheDocument();
    expect(screen.queryByText("Contact No")).not.toBeInTheDocument();
    expect(screen.queryByText("Address")).not.toBeInTheDocument();
  });
});
