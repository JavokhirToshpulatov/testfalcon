import { all, takeEvery, put, fork, call } from 'redux-saga/effects';

import {
    DELETE_KEYWORDS,
    DELETE_USER, EDIT_KEYWORDS, EDIT_USER, GET_KEYWORD_SCAN,
    GET_KEYWORDS,
    GET_SINGLE_KEYWORD,
    POST_NEW_AGENTS,
    POST_NEW_KEYWORDS
} from "../../constants/data";
import {getKeywords, updateDataState} from "../../actions/data";
import service from "../../../auth/FetchInterceptor";
import history from "../../../history";

function* callGetAllKeywords() {
    yield takeEvery(GET_KEYWORDS, function* ({payload}) {
        try {
            const data = yield call(service, {
                method: "get",
                url: "/api/keywords",
                params: payload?.params
            });
            yield put(updateDataState({keywords: data}));
        } catch (error) {
            console.log(error);
        }
    });
}

function* callGetKeywordScan() {
    yield takeEvery(GET_KEYWORD_SCAN, function* ({payload}) {
        try {
            const data = yield call(service, {
                method: "get",
                url: "/api/keywords/scans",
                params: payload?.params
            });
            yield put(updateDataState({domainScans: data}));
        } catch (error) {
            console.log(error);
        }
    });
}

function* callGetSingleKeywords() {
    yield takeEvery(GET_SINGLE_KEYWORD, function* ({payload}) {
        try {
            const data = yield call(service, {
                method: "get",
                url: "/api/keywords/"+payload?.id,
                params: payload?.params
            });
            yield put(updateDataState({singleKeyword: data}));
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
            history.go(-1)
        } catch (error) {
            console.log(error);
        }
    });
}

export function* editKeyword() {
    yield takeEvery(EDIT_KEYWORDS, function* ({ payload = {} }) {
        try {
            const { message } = yield call(service, {
                method: 'put',
                url: '/api/keywords',
                data: payload
            })
        } catch (err) {
            console.log(err);
        }
    })
}


function* callDeleteKeywords() {
    yield takeEvery(DELETE_KEYWORDS, function* ({payload}) {
        try {
            yield call(service, {
                method: "delete",
                url: "/api/keywords/"+payload?.id,
            });
            yield put(getKeywords())
        } catch (error) {
            console.log(error);
        }
    });
}



export default function* rootSaga() {
    yield all([
        fork(callGetAllKeywords),
        fork(callPostNewKeywords),
        fork(callDeleteKeywords),
        fork(callGetSingleKeywords),
        fork(callGetKeywordScan),
        fork(editKeyword),
    ]);
}