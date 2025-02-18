import { describe, it, expect } from "vitest";
import {
    SEARCH_EMPLOYEES_REQUEST,
    SEARCH_EMPLOYEES_SUCCESS,
    SEARCH_EMPLOYEES_FAILURE,
} from "../actions/searchActions";
import { Employee } from "../../utility/types";

describe("searchActions", () => {
    it("Create an action for SEARCH_EMPLOYEES_REQUEST with a search term", () => {
        const searchTerm = "John Doe";
        const action = SEARCH_EMPLOYEES_REQUEST(searchTerm);

        expect(action).toEqual({
            type: "SEARCH_EMPLOYEES_REQUEST",
            payload: searchTerm,
        });
    });

    it("Create an action for SEARCH_EMPLOYEES_SUCCESS with an array of employees", () => {
        const mockEmployees: Employee[] = [
            {
                id: "E123",
                avatar: "https://example.com/avatar1.jpg",
                firstName: "Saravanan",
                lastName: "Karthick",
                jobTitle: "Software Engineer",
                contactNo: 1234567890,
                address: "123 Test St",
                age: 30,
                bio: "Experienced Software Engineer",
                dateJoined: "2022-01-01",
            },
        ];

        const action = SEARCH_EMPLOYEES_SUCCESS(mockEmployees);

        expect(action).toEqual({
            type: "SEARCH_EMPLOYEES_SUCCESS",
            payload: mockEmployees,
        });
    });

    it("Create an action for SEARCH_EMPLOYEES_FAILURE with an error message", () => {
        const errorMessage = "Failed to fetch employees";
        const action = SEARCH_EMPLOYEES_FAILURE(errorMessage);

        expect(action).toEqual({
            type: "SEARCH_EMPLOYEES_FAILURE",
            payload: errorMessage,
        });
    });
});
