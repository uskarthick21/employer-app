import { describe, it, expect } from "vitest";
import {
  FETCH_COMPANY_REQUEST,
  FETCH_COMPANY_SUCCESS,
  FETCH_COMPANY_FAILURE,
} from "./companyActions";
import { CompanyDataResponse } from "../../utility/types";

describe("companyActions", () => {
  it("should create an action for FETCH_COMPANY_REQUEST", () => {
    const action = FETCH_COMPANY_REQUEST();
    expect(action).toEqual({ type: "FETCH_COMPANY_REQUEST" });
  });

  it("Create an action for FETCH_COMPANY_SUCCESS with payload", () => {
    const mockCompanyData: CompanyDataResponse = {
      companyInfo: {
        companyName: "West pac",
        companyMotto: "Good bank",
        companyEst: "2000-01-01",
      },
      employees: [],
    };

    const action = FETCH_COMPANY_SUCCESS(mockCompanyData);
    expect(action).toEqual({
      type: "FETCH_COMPANY_SUCCESS",
      payload: mockCompanyData,
    });
  });

  it("Create an action for FETCH_COMPANY_FAILURE with an error message", () => {
    const errorMessage = "Failed to fetch company data";
    const action = FETCH_COMPANY_FAILURE(errorMessage);
    expect(action).toEqual({
      type: "FETCH_COMPANY_FAILURE",
      payload: errorMessage,
    });
  });
});
