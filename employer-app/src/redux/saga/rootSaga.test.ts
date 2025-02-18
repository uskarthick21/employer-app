import { describe, it, expect } from "vitest";
import { all } from "redux-saga/effects";
import rootSaga from "./rootSaga";
import { watchFetchCompany } from "./companySaga";
import { watchSearchEmployees } from "./searchSaga";

describe("rootSaga", () => {
    it("should combine all sagas", () => {
        const generator = rootSaga();

        expect(generator.next().value).toEqual(all([watchFetchCompany(), watchSearchEmployees()]));

        expect(generator.next().done).toBeTruthy();
    });
});
