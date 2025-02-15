import { configureStore } from "@reduxjs/toolkit";
import { companyReducer } from "../slice/company/companySlice";


export const store = configureStore({
    reducer: {
        company: companyReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;