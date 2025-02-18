import { configureStore } from "@reduxjs/toolkit";
import { companyReducer } from "../slice/company/companySlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/rootSaga";
import { employeeDetailReducer } from "../slice/employee/employeeDetailSlice";
import { searchReducer } from "../slice/search/searchSlice";
import { sortReducer } from "../slice/sort/sortSlice";

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

export const store = configureStore({
    reducer: {
        company: companyReducer,
        employeeDetail: employeeDetailReducer,
        search: searchReducer,
        sort: sortReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware)
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;