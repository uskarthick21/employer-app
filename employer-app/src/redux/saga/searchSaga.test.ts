import { describe, it, expect, vi } from "vitest";
import { call, put } from "redux-saga/effects";
import {
    SEARCH_EMPLOYEES_REQUEST,
    SEARCH_EMPLOYEES_SUCCESS,
    SEARCH_EMPLOYEES_FAILURE,
} from "../actions/searchActions";
import { fetchEmployeesSaga } from "./searchSaga";
import { fetchEmployees } from "../saga/searchSaga";
import { Employee } from "../../utility/types";


const mockEmployees: Employee[] = [
    { id: "E123", firstName: "Saravana", lastName: "Karthick", contactNo: 1234567890, address: "123 Street", avatar: "" },
    { id: "E124", firstName: "Raj", lastName: "Kumar", contactNo: 9876543210, address: "456 Avenue", avatar: "" },
];


vi.mock("../services/employeeService", () => ({
    fetchEmployees: vi.fn(() => Promise.resolve(mockEmployees)),
}));

describe("searchSaga", () => {
    it("should handle successful employee search", () => {
        const generator = fetchEmployeesSaga({ type: SEARCH_EMPLOYEES_REQUEST.type, payload: "John" });

        expect(generator.next().value).toEqual(call(fetchEmployees, "John"));

        expect(generator.next(mockEmployees).value).toEqual(
            put(SEARCH_EMPLOYEES_SUCCESS(mockEmployees))
        );

        expect(generator.next().done).toBeTruthy();
    });

    it("should handle API failure", () => {
        const generator = fetchEmployeesSaga({ type: SEARCH_EMPLOYEES_REQUEST.type, payload: "NonExistingName" });
        const errorMessage = "No employees found";
        const error = new Error(errorMessage);

        expect(generator.next().value).toEqual(call(fetchEmployees, "NonExistingName"));

        expect(generator.throw(error).value).toEqual(
            put(SEARCH_EMPLOYEES_FAILURE(errorMessage))
        );

        expect(generator.next().done).toBeTruthy();
    });
});
