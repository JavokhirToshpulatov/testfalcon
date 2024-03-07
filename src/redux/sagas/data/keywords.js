import { all, takeEvery, put, fork, call } from 'redux-saga/effects';

import {DELETE_KEYWORDS, DELETE_USER, GET_KEYWORDS, POST_NEW_AGENTS, POST_NEW_KEYWORDS} from "../../constants/data";
import {updateDataState} from "../../actions/data";
import service from "../../../auth/FetchInterceptor";

function* callGetAllKeywords() {
    yield takeEvery(GET_KEYWORDS, function* ({payload}) {
        try {
            const data = yield call(service, {
                method: "get",
                url: "/api/keywords",
                params: payload?.params
            });
            // yield put(updateDataState({allAgents: data}));
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    });
}

function* callPostNewKeywords() {
    yield takeEvery(POST_NEW_KEYWORDS, function* ({payload}) {
        try {
            const data = yield call(service, {
                method: "post",
                url: "/api/keywords",
                data: payload.data,
                params: payload?.params
            });

            console.log(data);
        } catch (error) {
            console.log(error);
        }
    });
}

function* callDeleteKeywords() {
    yield takeEvery(DELETE_KEYWORDS, function* ({payload}) {
        try {
            const data = yield call(service, {
                method: "delete",
                url: "/api/keywords/"+payload.id,
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
        fork(callGetAllKeywords()),
        fork(callPostNewKeywords()),
        fork(callDeleteKeywords()),
    ]);
}