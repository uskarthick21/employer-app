import { render, screen } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Header from "../components/Header";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { companyReducer } from "../redux/slice/company/companySlice";
import { FETCH_COMPANY_REQUEST } from "../redux/actions/companyActions";

vi.mock("react-redux", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

const createMockStore = (initialState: any) =>
  configureStore({
    reducer: { company: companyReducer },
    preloadedState: { company: initialState },
  });

describe("Header Component", () => {
  let dispatchMock: any;

  beforeEach(() => {
    dispatchMock = vi.fn();
    (useDispatch as vi.Mock).mockReturnValue(dispatchMock);
  });

  it("dispatches FETCH_COMPANY_REQUEST on mount", () => {
    render(
      <Provider
        store={createMockStore({ data: null, isLoading: false, error: null })}
      >
        <Header />
      </Provider>
    );

    expect(dispatchMock).toHaveBeenCalledWith(FETCH_COMPANY_REQUEST());
  });

  it("renders loading state when isLoading is true", () => {
    render(
      <Provider
        store={createMockStore({ data: null, isLoading: true, error: null })}
      >
        <Header />
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
          error: "Error fetching company",
        })}
      >
        <Header />
      </Provider>
    );

    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("renders 'No Company Info' if company data is missing", () => {
    render(
      <Provider
        store={createMockStore({ data: null, isLoading: false, error: null })}
      >
        <Header />
      </Provider>
    );

    expect(screen.getByText("No Company Info")).toBeInTheDocument();
  });

  it("renders company details when company data is available", () => {
    const mockCompanyData = {
      companyInfo: {
        companyName: "WestPac",
        companyMotto: "Excellence in Banking",
        companyEst: "2000-01-01T00:00:00.000Z",
      },
    };

    render(
      <Provider
        store={createMockStore({
          data: mockCompanyData,
          isLoading: false,
          error: null,
        })}
      >
        <Header />
      </Provider>
    );

    expect(screen.getByText("WestPac")).toBeInTheDocument();
    expect(screen.getByText("Excellence in Banking")).toBeInTheDocument();
    expect(screen.getByText(/Since/)).toBeInTheDocument();
  });
});
