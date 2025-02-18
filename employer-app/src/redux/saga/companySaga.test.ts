import { describe, it, expect, vi } from "vitest";
import { call, put } from "redux-saga/effects";
import {
    FETCH_COMPANY_SUCCESS,
    FETCH_COMPANY_FAILURE,
} from "../actions/companyActions";
import { fetchCompanySaga } from "./companySaga";
import { fetchCompany } from "../saga/companySaga";
import { CompanyDataResponse } from "../../utility/types";


const mockCompanyData: CompanyDataResponse = {
    companyInfo: {
        companyName: "Test Corp",
        companyMotto: "Innovation and Excellence",
        companyEst: "2000-01-01",
    },
    employees: [],
};


vi.mock("../services/companyService", () => ({
    fetchCompany: vi.fn(() => Promise.resolve(mockCompanyData)),
}));

describe("companySaga", () => {
    it("should handle successful API call", () => {
        const generator = fetchCompanySaga();

        expect(generator.next().value).toEqual(call(fetchCompany));

        expect(generator.next(mockCompanyData).value).toEqual(
            put(FETCH_COMPANY_SUCCESS(mockCompanyData))
        );

        expect(generator.next().done).toBeTruthy();
    });

    it("should handle API failure", () => {
        const generator = fetchCompanySaga();
        const errorMessage = "Network Error";
        const error = new Error(errorMessage);

        expect(generator.next().value).toEqual(call(fetchCompany));

        expect(generator.throw(error).value).toEqual(
            put(FETCH_COMPANY_FAILURE(errorMessage))
        );

        expect(generator.next().done).toBeTruthy();
    });
});
