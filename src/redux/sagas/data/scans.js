import { all, takeEvery, put, fork, call } from 'redux-saga/effects';

import {DELETE_SCANS, DELETE_USER, GET_SCANS, POST_NEW_AGENTS, POST_NEW_SCANS} from "../../constants/data";
import {updateDataState} from "../../actions/data";
import service from "../../../auth/FetchInterceptor";

function* callGetAllScans() {
    yield takeEvery(GET_SCANS, function* ({payload}) {
        try {
            const data = yield call(service, {
                method: "get",
                url: "/api/scans",
                params: payload?.params
            });
            // yield put(updateDataState({allAgents: data}));
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    });
}

function* callPostNewScans() {
    yield takeEvery(POST_NEW_SCANS, function* ({payload}) {
        try {
            const data = yield call(service, {
                method: "post",
                url: "/api/scans",
                data: payload.data,
                params: payload?.params
            });

            console.log(data);
        } catch (error) {
            console.log(error);
        }
    });
}

function* callDeleteScans() {
    yield takeEvery(DELETE_SCANS, function* ({payload}) {
        try {
            const data = yield call(service, {
                method: "delete",
                url: "/api/scans/"+payload.id,
                params: payload?.params
            });

            console.log(data);
        } catch (error) {
            console.log(error);
        }
    });
}


export default function* rootSaga() {
    yield all([
        fork(callGetAllScans()),
        fork(callPostNewScans()),
        fork(callDeleteScans()),
    ]);
}