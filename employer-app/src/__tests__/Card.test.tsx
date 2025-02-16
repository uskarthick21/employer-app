import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Card from "../components/Card";
import {
  employeeDetailReducer,
  setEmployeeDetail,
} from "../redux/slice/employee/employeeDetailSlice";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

// Mock Employee Data
const mockEmployee = {
  id: "A123",
  avatar: "/invalid-avatar.png",
  firstName: "saravana",
  lastName: "karthick",
  contactNo: 1237890,
  address: "123 Cross street",
};

// Mock Store
const store = configureStore({
  reducer: {
    employeeDetail: employeeDetailReducer,
  },
});

// Add modal-root for modal testing
beforeEach(() => {
  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal-root");
  document.body.appendChild(modalRoot);
});

afterEach(() => {
  const modalRoot = document.getElementById("modal-root");
  if (modalRoot) {
    document.body.removeChild(modalRoot);
  }
});

describe("Card Component", () => {
  it("renders employee details correctly", () => {
    render(
      <Provider store={store}>
        <Card employee={mockEmployee} />
      </Provider>
    );

    expect(screen.getByText("saravana karthick")).toBeInTheDocument();
    expect(screen.getByText("1237890")).toBeInTheDocument();
    expect(screen.getByText("123 Cross street")).toBeInTheDocument();
    expect(screen.getByText("A123")).toBeInTheDocument();
  });

  it("dispatches setEmployeeDetail when clicked", () => {
    const dispatchSpy = vi.spyOn(store, "dispatch");
    render(
      <Provider store={store}>
        <Card employee={mockEmployee} />
      </Provider>
    );

    fireEvent.click(screen.getByText("saravana karthick"));

    expect(dispatchSpy).toHaveBeenCalledWith(setEmployeeDetail(mockEmployee));
  });

  it("opens modal on click", async () => {
    render(
      <Provider store={store}>
        <Card employee={mockEmployee} />
      </Provider>
    );

    fireEvent.click(screen.getByText("saravana karthick"));

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });

  it("handles image error and sets default avatar", () => {
    render(
      <Provider store={store}>
        <Card employee={mockEmployee} />
      </Provider>
    );

    const imgElement = screen.getByAltText(
      "saravana karthick"
    ) as HTMLImageElement;

    fireEvent.error(imgElement);

    expect(imgElement.src).toContain("/default-avatar.png");
  });
});
