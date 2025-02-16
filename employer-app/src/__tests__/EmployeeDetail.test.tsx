import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import EmployeeDetail from "../components/EmployeeDetail";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { employeeDetailReducer } from "../redux/slice/employee/employeeDetailSlice";
import useDebounceResize from "../hooks/useDebounceResize";

vi.mock("../hooks/useDebounceResize", () => ({
  __esModule: true,
  default: vi.fn(),
}));

const createMockStore = (initialState: any) =>
  configureStore({
    reducer: { employeeDetail: employeeDetailReducer },
    preloadedState: { employeeDetail: initialState },
  });

describe("EmployeeDetail Component", () => {
  beforeEach(() => {
    (useDebounceResize as vi.Mock).mockReturnValue(false); // Default to Desktop Mode
  });

  const mockEmployee = {
    avatar: "/invalid-avatar.png",
    firstName: "Saravana",
    lastName: "Karthick",
    jobTitle: "Software Engineer",
    contactNo: "123-456-7890",
    address: "123 Main Street",
    age: 30,
    bio: "Experienced developer in web technologies.",
    dateJoined: "2015-06-15T00:00:00.000Z",
  };

  it("renders employee details correctly", () => {
    render(
      <Provider store={createMockStore(mockEmployee)}>
        <EmployeeDetail />
      </Provider>
    );

    expect(screen.getByText("Saravana Karthick")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === "Age: 30";
      })
    ).toBeInTheDocument();

    expect(screen.getByText("123 Main Street")).toBeInTheDocument();
    expect(
      screen.getByText("Experienced developer in web technologies.")
    ).toBeInTheDocument();
    expect(screen.getByText(/Joined Date:/)).toBeInTheDocument();
  });

  it("handles missing dateJoined gracefully", () => {
    const employeeWithoutDate = { ...mockEmployee, dateJoined: null };

    render(
      <Provider store={createMockStore(employeeWithoutDate)}>
        <EmployeeDetail />
      </Provider>
    );

    expect(screen.getByText(/Joined Date:/)).toBeInTheDocument();
  });

  it("handles image error and sets default avatar", () => {
    render(
      <Provider store={createMockStore(mockEmployee)}>
        <EmployeeDetail />
      </Provider>
    );

    const imgElement = screen.getByAltText(
      "Saravana Karthick"
    ) as HTMLImageElement;
    fireEvent.error(imgElement);

    expect(imgElement.src).toContain("/default-avatar.png");
  });

  it("renders mobile layout when isMobile is true", () => {
    (useDebounceResize as vi.Mock).mockReturnValue(true);

    render(
      <Provider store={createMockStore(mockEmployee)}>
        <EmployeeDetail />
      </Provider>
    );

    expect(
      screen.getByText((content, element) => {
        return element?.textContent === "Role: Software Engineer";
      })
    ).toBeInTheDocument();
  });

  it("renders desktop layout when isMobile is false", () => {
    (useDebounceResize as vi.Mock).mockReturnValue(false);

    render(
      <Provider store={createMockStore(mockEmployee)}>
        <EmployeeDetail />
      </Provider>
    );

    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === "Age: 30";
      })
    ).toBeInTheDocument();
  });
});
