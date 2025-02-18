import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { SEARCH_EMPLOYEES_REQUEST, SEARCH_EMPLOYEES_SUCCESS, SEARCH_EMPLOYEES_FAILURE } from "../actions/searchActions";
import { Employee } from "../../utility/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetchEmployees = async (searchTerm: string) => {
    const response = await axios.get(`${API_BASE_URL}/employee`, {
        params: { search: searchTerm },
    });
    return response.data;
};


function* fetchEmployeesSaga(action: { type: string; payload: string }): Generator<unknown, void, Employee[]> {
    try {
        const data = yield call(fetchEmployees, action.payload);
        yield put(SEARCH_EMPLOYEES_SUCCESS(data));
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        yield put(SEARCH_EMPLOYEES_FAILURE(errorMessage));
    }
}


export function* watchSearchEmployees() {
    yield takeLatest(SEARCH_EMPLOYEES_REQUEST.type, fetchEmployeesSaga);
}
