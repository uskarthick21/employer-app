import { createAction } from "@reduxjs/toolkit";

export const FETCH_COMPANY_REQUEST = createAction("FETCH_COMPANY_REQUEST");
export const FETCH_COMPANY_SUCCESS = createAction("FETCH_COMPANY_SUCCESS");
export const FETCH_COMPANY_FAILURE = createAction("FETCH_COMPANY_FAILURE");
