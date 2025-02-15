import { createSlice } from "@reduxjs/toolkit";


const companySlice = createSlice({
    name: "company",
    initialState: {
        name: 'new Company',
    },
    reducers: {}
})

export const companyReducer = companySlice.reducer;