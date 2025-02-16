import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employee } from "../../../utility/types";

const initialState: Employee = {
    id: "",
    avatar: "",
    firstName: "",
    lastName: "",
    jobTitle: "",
    contactNo: 0,
    address: "",
    age: 0,
    bio: "",
    dateJoined: "",
};

const employeeDetailSlice = createSlice({
    name: "employeeDetail",
    initialState,
    reducers: {
        setEmployeeDetail: (state, action: PayloadAction<Employee>) => action.payload,
    },
});

export const employeeDetailReducer = employeeDetailSlice.reducer;

export const { setEmployeeDetail } = employeeDetailSlice.actions;
