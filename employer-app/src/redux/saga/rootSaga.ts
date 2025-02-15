import { all } from "redux-saga/effects";
import { watchFetchCompany } from "./companySaga";

const rootSaga = function* () {
  yield all([watchFetchCompany()]);
};

export default rootSaga;
