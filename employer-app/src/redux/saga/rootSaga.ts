import { all } from "redux-saga/effects";
import { watchFetchCompany } from "./companySaga";
import { watchSearchEmployees } from "./searchSaga";

const rootSaga = function* () {
  yield all([watchFetchCompany(), watchSearchEmployees()]);
};

export default rootSaga;
