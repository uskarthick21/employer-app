import { createSlice } from "@reduxjs/toolkit";
import { FETCH_COMPANY_FAILURE, FETCH_COMPANY_REQUEST, FETCH_COMPANY_SUCCESS } from "../../actions/companyActions";
import { CompanyState } from "../../../utility/types";


const companySlice = createSlice({
    name: "company",
    initialState: <CompanyState>{
        data: null,
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(FETCH_COMPANY_REQUEST, (state) => {
            state.isLoading = true;
        });
        builder.addCase(FETCH_COMPANY_SUCCESS, (state, action) => {
            state.isLoading = false;
            state.data = action.payload || null;
        });
        builder.addCase(FETCH_COMPANY_FAILURE, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
})

export const companyReducer = companySlice.reducer;


