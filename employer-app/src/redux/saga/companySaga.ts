import { call, put, takeEvery } from 'redux-saga/effects';
import axios from "axios"
import { FETCH_COMPANY_SUCCESS, FETCH_COMPANY_FAILURE, FETCH_COMPANY_REQUEST } from '../actions/companyActions';
import { CompanyDataResponse } from '../../utility/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const fetchCompany = async () => {
    const response = await axios(`${API_BASE_URL}/company`);
    return response.data;
}

function* fetchCompanySaga(): Generator<unknown, void, CompanyDataResponse> {
    try {
        const data = yield call(fetchCompany)
        yield put(FETCH_COMPANY_SUCCESS(data));
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        yield put(FETCH_COMPANY_FAILURE(errorMessage));
    }
}

export function* watchFetchCompany() {
    yield takeEvery(FETCH_COMPANY_REQUEST, fetchCompanySaga)
}