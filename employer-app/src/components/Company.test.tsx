import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Company from "../components/Company";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useDispatch } from "react-redux";
import { setSortField } from "../redux/slice/sort/sortSlice";
import useDebounceResize from "../hooks/useDebounceResize";

// Mock `useDebounceResize` (Mobile/Desktop Responsive Hook)
vi.mock("../hooks/useDebounceResize", () => ({
  __esModule: true,
  default: vi.fn(),
}));

// Mock `Card` component to prevent actual rendering
vi.mock("../components/Card", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-card" />,
}));

// Mock `Pagination` component
vi.mock("../components/Pagination", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-pagination" />,
}));

// Mock Redux Dispatch
vi.mock("react-redux", async () => {
  const actual = await vi.importActual<typeof import("react-redux")>(
    "react-redux"
  );
  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

// Create a mock Redux store
const mockStore = configureMockStore([]);

const createMockStore = (companyState: any, searchState: any, sortState: any) =>
  mockStore({
    company: companyState,
    search: searchState, // ✅ Added search state
    sort: sortState, // ✅ Added sort state
  });

describe("Company Component", () => {
  let mockDispatch: vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockDispatch = vi.fn();
    (useDispatch as vi.Mock).mockReturnValue(mockDispatch);
    useDebounceResize.mockReturnValue(false); // Default: Desktop Mode
  });

  it("renders loading state when `isLoading` is true", () => {
    render(
      <Provider
        store={createMockStore(
          { data: null, isLoading: true, error: null },
          { data: [], isLoading: false, error: null },
          { field: "", order: "asc" }
        )}
      >
        <Company />
      </Provider>
    );

    expect(screen.getByText("Loading employees...")).toBeInTheDocument();
  });

  it("renders error message when an error occurs", () => {
    render(
      <Provider
        store={createMockStore(
          { data: null, isLoading: false, error: "Server Error" },
          { data: [], isLoading: false, error: null },
          { field: "", order: "asc" }
        )}
      >
        <Company />
      </Provider>
    );

    expect(screen.getByText("Server Error")).toBeInTheDocument();
  });

  it("renders the correct number of employee cards", () => {
    const mockEmployees = [
      { id: "E123", firstName: "Saravana", lastName: "Karthick" },
      { id: "E124", firstName: "Kiran", lastName: "Raj" },
    ];

    render(
      <Provider
        store={createMockStore(
          { data: { employees: mockEmployees }, isLoading: false, error: null },
          { data: [], isLoading: false, error: null },
          { field: "", order: "asc" }
        )}
      >
        <Company />
      </Provider>
    );

    expect(screen.getAllByTestId("mock-card")).toHaveLength(2);
  });

  it("dispatches sorting action when clicking sort buttons", () => {
    render(
      <Provider
        store={createMockStore(
          { data: { employees: [] }, isLoading: false, error: null }, // Company State
          { data: [], isLoading: false, error: null }, // Search State
          { field: "", order: "asc" } // Sort State
        )}
      >
        <Company />
      </Provider>
    );

    // Get all sort buttons for ascending order
    const sortAscButtons = screen.getAllByTitle("Sort in ascending order");

    // Click the first button (Sorting by ID)
    fireEvent.click(sortAscButtons[0]);
    expect(mockDispatch).toHaveBeenCalledWith(
      setSortField({ field: "id", order: "asc" })
    );

    // Click the second button (Sorting by Name)
    fireEvent.click(sortAscButtons[1]);
    expect(mockDispatch).toHaveBeenCalledWith(
      setSortField({ field: "firstName", order: "asc" })
    );

    // Click the third button (Sorting by Contact No)
    fireEvent.click(sortAscButtons[2]);
    expect(mockDispatch).toHaveBeenCalledWith(
      setSortField({ field: "contactNo", order: "asc" })
    );

    // Click the fourth button (Sorting by Address)
    fireEvent.click(sortAscButtons[3]);
    expect(mockDispatch).toHaveBeenCalledWith(
      setSortField({ field: "address", order: "asc" })
    );
  });

  it("renders pagination when employees exist", () => {
    const mockEmployees = [
      { id: "E123", firstName: "Saravana", lastName: "Karthick" },
      { id: "E124", firstName: "Kiran", lastName: "Raj" },
    ];

    render(
      <Provider
        store={createMockStore(
          { data: { employees: mockEmployees }, isLoading: false, error: null },
          { data: [], isLoading: false, error: null },
          { field: "", order: "asc" }
        )}
      >
        <Company />
      </Provider>
    );

    expect(screen.getByTestId("mock-pagination")).toBeInTheDocument();
  });

  it("hides pagination when no employees exist", () => {
    render(
      <Provider
        store={createMockStore(
          { data: { employees: [] }, isLoading: false, error: null },
          { data: [], isLoading: false, error: null },
          { field: "", order: "asc" }
        )}
      >
        <Company />
      </Provider>
    );

    expect(screen.queryByTestId("mock-pagination")).not.toBeInTheDocument();
  });
});
