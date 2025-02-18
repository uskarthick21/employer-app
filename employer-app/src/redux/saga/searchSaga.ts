import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { SEARCH_EMPLOYEES_REQUEST, SEARCH_EMPLOYEES_SUCCESS, SEARCH_EMPLOYEES_FAILURE } from "../actions/searchActions";
import { Employee } from "../../utility/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchEmployees = async (searchTerm: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/employee`, {
            params: { search: searchTerm },
        });
        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if (error.response?.status === 404) {
            throw new Error("No employees found");
        } else if (error.response?.status === 500) {
            throw new Error("Something went wrong on the server. Please try again later.");
        }
        throw new Error("Something went wrong. Please try again.");
    }
};

export function* fetchEmployeesSaga(action: { type: string; payload: string }) {
    try {
        const data: Employee[] = yield call(fetchEmployees, action.payload);
        yield put(SEARCH_EMPLOYEES_SUCCESS(data));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        yield put(SEARCH_EMPLOYEES_FAILURE(error.message));
    }
}


export function* watchSearchEmployees() {
    yield takeLatest(SEARCH_EMPLOYEES_REQUEST.type, fetchEmployeesSaga);
}
