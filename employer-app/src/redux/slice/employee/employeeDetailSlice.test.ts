import { describe, it, expect } from "vitest";
import { employeeDetailReducer, setEmployeeDetail } from "../../../redux/slice/employee/employeeDetailSlice";
import { Employee } from "../../../utility/types";

// ✅ Mock Data
const initialState: Employee = {
    id: "",
    avatar: "",
    firstName: "",
    lastName: "",
    jobTitle: "",
    contactNo: 0,
    address: "",
    age: 0,
    bio: "",
    dateJoined: "",
};

const mockEmployee: Employee = {
    id: "E123",
    avatar: "https://example.com/avatar.jpg",
    firstName: "Saravana",
    lastName: "Karthick",
    jobTitle: "Software Engineer",
    contactNo: 1234567890,
    address: "Australia",
    age: 30,
    bio: "Passionate about coding",
    dateJoined: "2023-01-01",
};

describe("Employee Detail Slice", () => {
    it("should return the initial state when no action is provided", () => {
        const state = employeeDetailReducer(undefined, { type: undefined });
        expect(state).toEqual(initialState);
    });

    it("should update employee details when setEmployeeDetail action is dispatched", () => {
        const state = employeeDetailReducer(initialState, setEmployeeDetail(mockEmployee));
        expect(state).toEqual(mockEmployee);
    });
});
