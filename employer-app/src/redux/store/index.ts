import { configureStore } from "@reduxjs/toolkit";
import { companyReducer } from "../slice/company/companySlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/rootSaga";
import { employeeDetailReducer } from "../slice/employee/employeeDetailSlice";

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

export const store = configureStore({
    reducer: {
        company: companyReducer,
        employeeDetail: employeeDetailReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware)
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;