import { describe, it, expect } from "vitest";
import { companyReducer } from "../../slice/company/companySlice";
import {
    FETCH_COMPANY_REQUEST,
    FETCH_COMPANY_SUCCESS,
    FETCH_COMPANY_FAILURE,
} from "../../actions/companyActions";
import { CompanyState } from "../../../utility/types";


const initialState: CompanyState = {
    data: null,
    isLoading: false,
    error: null,
};

const mockCompanyData = {
    companyInfo: {
        companyName: "Test Corp",
        companyMotto: "Innovation and Excellence",
        companyEst: "2000-01-01",
    },
    employees: [
        { id: "E123", firstName: "John", lastName: "Doe", contactNo: "1234567890", address: "New York" },
    ],
};

describe("Company Slice", () => {

    it("return the initial state when no action is provided", () => {
        const state = companyReducer(undefined, { type: undefined });
        expect(state).toEqual(initialState);
    });

    it("handle FETCH_COMPANY_REQUEST by setting isLoading to true", () => {
        const state = companyReducer(initialState, FETCH_COMPANY_REQUEST());
        expect(state.isLoading).toBe(true);
    });

    it("handle FETCH_COMPANY_SUCCESS by setting data and isLoading to false", () => {
        const state = companyReducer(initialState, FETCH_COMPANY_SUCCESS(mockCompanyData));

        expect(state.isLoading).toBe(false);
        expect(state.data).toEqual(mockCompanyData);
    });

    it("handle FETCH_COMPANY_FAILURE by setting an error message", () => {
        const mockErrorMessage = "Failed to fetch company data";
        const state = companyReducer(initialState, FETCH_COMPANY_FAILURE(mockErrorMessage));

        expect(state.isLoading).toBe(false);
        expect(state.error).toBe(mockErrorMessage);
    });
});
