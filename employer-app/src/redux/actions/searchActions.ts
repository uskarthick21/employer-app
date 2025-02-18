import { createAction } from "@reduxjs/toolkit";
import { Employee } from "../../utility/types";

export const SEARCH_EMPLOYEES_REQUEST = createAction<string>("SEARCH_EMPLOYEES_REQUEST");
export const SEARCH_EMPLOYEES_SUCCESS = createAction<Employee[]>("SEARCH_EMPLOYEES_SUCCESS");
export const SEARCH_EMPLOYEES_FAILURE = createAction<string>("SEARCH_EMPLOYEES_FAILURE");
