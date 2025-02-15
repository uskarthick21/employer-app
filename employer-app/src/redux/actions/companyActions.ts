import { createAction } from "@reduxjs/toolkit";
import { CompanyDataResponse } from "../../utility/types";

export const FETCH_COMPANY_REQUEST = createAction("FETCH_COMPANY_REQUEST");
export const FETCH_COMPANY_SUCCESS = createAction<CompanyDataResponse>("FETCH_COMPANY_SUCCESS");
export const FETCH_COMPANY_FAILURE = createAction<string>("FETCH_COMPANY_FAILURE");
