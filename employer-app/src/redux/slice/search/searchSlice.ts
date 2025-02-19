import { createSlice } from "@reduxjs/toolkit";
import { SEARCH_EMPLOYEES_REQUEST, SEARCH_EMPLOYEES_SUCCESS, SEARCH_EMPLOYEES_FAILURE, SEARCH_RESET } from "../../actions/searchActions";
import { Employee } from "../../../utility/types";

interface EmployeeSearchState {
    data: Employee[];
    isLoading: boolean;
    error: string | null;
}

const initialState: EmployeeSearchState = {
    data: [],
    isLoading: false,
    error: null,
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(SEARCH_EMPLOYEES_REQUEST, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(SEARCH_EMPLOYEES_SUCCESS, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(SEARCH_EMPLOYEES_FAILURE, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        builder.addCase(SEARCH_RESET, (state) => {
            state.data = []
            state.isLoading = false;
            state.error = null;
        })
    },
});

export const searchReducer = searchSlice.reducer;
