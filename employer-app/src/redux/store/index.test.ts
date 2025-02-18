import { describe, it, expect, vi } from "vitest";
import configureStore from "redux-mock-store";
import createSagaMiddleware from "redux-saga";
import { store, RootState } from "./index";
import { companyReducer } from "../slice/company/companySlice";
import { employeeDetailReducer } from "../slice/employee/employeeDetailSlice";
import { searchReducer } from "../slice/search/searchSlice";
import { sortReducer } from "../slice/sort/sortSlice";

describe("Redux Store", () => {

    it("should initialize store with the correct reducers", () => {
        const state = store.getState();

        expect(state).toHaveProperty("company");
        expect(state).toHaveProperty("employeeDetail");
        expect(state).toHaveProperty("search");
        expect(state).toHaveProperty("sort");

        expect(state.company).toEqual(companyReducer(undefined, { type: undefined }));
        expect(state.employeeDetail).toEqual(employeeDetailReducer(undefined, { type: undefined }));
        expect(state.search).toEqual(searchReducer(undefined, { type: undefined }));
        expect(state.sort).toEqual(sortReducer(undefined, { type: undefined }));
    });

    it("should dispatch actions correctly", () => {
        store.dispatch({ type: "TEST_ACTION" });
        expect(store.getState()).toBeDefined();
    });

    it("should return the correct RootState type", () => {
        const state: RootState = store.getState();
        expect(state).toBeDefined();
    });

    it("should apply saga middleware", () => {
        const sagaMiddleware = createSagaMiddleware();
        const mockStore = configureStore([sagaMiddleware]);

        const testStore = mockStore({
            company: companyReducer(undefined, { type: undefined }),
            employeeDetail: employeeDetailReducer(undefined, { type: undefined }),
            search: searchReducer(undefined, { type: undefined }),
            sort: sortReducer(undefined, { type: undefined }),
        });

        expect(testStore.getState()).toBeDefined();
    });

});
