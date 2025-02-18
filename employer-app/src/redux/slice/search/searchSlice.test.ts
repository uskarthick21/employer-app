import { describe, it, expect } from "vitest";
import { searchReducer } from "../../../redux/slice/search/searchSlice";
import {
    SEARCH_EMPLOYEES_REQUEST,
    SEARCH_EMPLOYEES_SUCCESS,
    SEARCH_EMPLOYEES_FAILURE,
} from "../../../redux/actions/searchActions";
import { Employee } from "../../../utility/types";

const initialState = {
    data: [],
    isLoading: false,
    error: null,
};

const mockEmployees: Employee[] = [
    {
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
    }
];

describe("Search Slice", () => {

    it("return the initial state when no action is provided", () => {
        const state = searchReducer(undefined, { type: undefined });
        expect(state).toEqual(initialState);
    });

    it("should handle SEARCH_EMPLOYEES_REQUEST action", () => {
        const action = SEARCH_EMPLOYEES_REQUEST("John");
        const state = searchReducer(initialState, action);

        expect(state.isLoading).toBe(true);
        expect(state.error).toBeNull();
        expect(state.data).toEqual([]);
    });

    it("should handle SEARCH_EMPLOYEES_SUCCESS action", () => {
        const action = SEARCH_EMPLOYEES_SUCCESS(mockEmployees);
        const state = searchReducer(initialState, action);

        expect(state.isLoading).toBe(false);
        expect(state.data).toEqual(mockEmployees);
        expect(state.error).toBeNull();
    });

    it("should handle SEARCH_EMPLOYEES_FAILURE action", () => {
        const errorMessage = "No employees found";
        const action = SEARCH_EMPLOYEES_FAILURE(errorMessage);
        const state = searchReducer(initialState, action);

        expect(state.isLoading).toBe(false);
        expect(state.error).toBe(errorMessage);
        expect(state.data).toEqual([]);
    });
});
