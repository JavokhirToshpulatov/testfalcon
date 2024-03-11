import { all, takeEvery, put, fork, call } from 'redux-saga/effects';

import {
    DELETE_SCANS,
    DELETE_USER, EDIT_SCANS, EDIT_USER,
    GET_ONE_SCANS_HISTORIES, GET_SCAN_HTML_CURRENT, GET_SCAN_HTML_PREVIOUS,
    GET_SCANS,
    GET_SCANS_AGENTS,
    GET_SCANS_DOMAINS,
    GET_SCANS_HISTORIES,
    GET_SCANS_HISTORIES_RESULTS, GET_SCANS_HISTORIES_WEB_SCANNER,
    GET_SCANS_KEYWORDS,
    GET_SINGLE_SCAN,
    POST_NEW_AGENTS,
    POST_NEW_SCANS
} from "../../constants/data";
import {getScans, updateDataState} from "../../actions/data";
import service from "../../../auth/FetchInterceptor";
import history from "../../../history";

function* callGetAllScans() {
    yield takeEvery(GET_SCANS, function* ({payload}) {
        try {
            const data = yield call(service, {
                method: "get",
                url: "/api/scans",
                params: payload?.params
            });
            yield put(updateDataState({allScans: data}));
        } catch (error) {
            console.log(error);
        }
    });
}

function* callGetSingleScans() {
    yield takeEvery(GET_SINGLE_SCAN, function* ({payload}) {
        try {
            const data = yield call(service, {
                method: "get",
                url: "/api/scans/"+payload?.id,
            });
            yield put(updateDataState({singleScan: data}));
        } catch (error) {
            console.log(error);
        }
    });
}

function* callGetScansAgent() {
    yield takeEvery(GET_SCANS_AGENTS, function* ({payload}) {
        try {
            const data = yield call(service, {
                method: "get",
                url: "/api/scans/agents",
                params:payload?.params
            });
            yield put(updateDataState({scanAgents: data}));
        } catch (error) {
            console.log(error);
        }
    });
}

function* callGetScansDomains() {
    yield takeEvery(GET_SCANS_DOMAINS, function* ({payload}) {
        try {
            const data = yield call(service, {
                method: "get",
                url: "/api/scans/targets",
                params:payload?.params
            });
            yield put(updateDataState({scanDomains: data}));
        } catch (error) {
            console.log(error);
        }
    });
}

function* callGetScanWebResult() {
    yield takeEvery(GET_SCANS_HISTORIES_WEB_SCANNER, function* ({payload}) {
        try {
            const data = yield call(service, {
                method: "get",
                url: "/api/scans/histories/web-scanner-results",
                params:payload?.params
            });
            yield put(updateDataState({scanWebHistories: data}));
        } catch (error) {
            console.log(error);
        }
    });
}

function* callGetScanHtmlCurrent() {
    yield takeEvery(GET_SCAN_HTML_CURRENT, function* ({payload}) {
        try {
            const data = yield call(service, {
                method: "get",
                url: "/api/scans/"+payload?.canId+"/histories/"+payload?.historyId+"/html/current/"+payload?.target,
            });
            yield put(updateDataState({scanHtmlCurrent: data}));
        } catch (error) {
            console.log(error);
        }
    });
}

function* callGetScanHtmlPrevious() {
    yield takeEvery(GET_SCAN_HTML_PREVIOUS, function* ({payload}) {
        try {
            const data = yield call(service, {
                method: "get",
                url: "/api/scans/"+payload?.canId+"/histories/"+payload?.historyId+"/html/previous/"+payload?.target,
            });
            yield put(updateDataState({scanHtmlPrevious: data}));
        } catch (error) {
            console.log(error);
        }
    });
}



function* callGetOneScansHistories() {
    yield takeEvery(GET_ONE_SCANS_HISTORIES, function* ({payload}) {
        try {
            const data = yield call(service, {
                method: "get",
                url: "/api/scans/histories/"+payload?.id,
            });
            yield put(updateDataState({historyOne: data}));
        } catch (error) {
            console.log(error);
        }
    });
}

function* callGetOneScansHistoriesResult() {
    yield takeEvery(GET_SCANS_HISTORIES_RESULTS, function* ({payload}) {
        try {
            const data = yield call(service, {
                method: "get",
                url: "/api/scans/histories/"+payload?.id+"/results",
                params:payload?.params
            });
            yield put(updateDataState({historyResult: data}));
        } catch (error) {
            console.log(error);
        }
    });
}

function* callGetScansKeywords() {
    yield takeEvery(GET_SCANS_KEYWORDS, function* ({payload}) {
        try {
            const data = yield call(service, {
                method: "get",
                url: "/api/scans/keywords",
                params:payload?.params
            });
            yield put(updateDataState({scanKeywords: data}));
        } catch (error) {
            console.log(error);
        }
    });
}

function* callGetScansHistories() {
    yield takeEvery(GET_SCANS_HISTORIES, function* ({payload}) {
        try {
            const data = yield call(service, {
                method: "get",
                url: "/api/scans/histories",
                params:payload?.params
            });
            yield put(updateDataState({histories: data}));
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
            history.go(-1)
        } catch (error) {
            console.log(error);
        }
    });
}

export function* editScan() {
    yield takeEvery(EDIT_SCANS, function* ({ payload = {} }) {
        try {
            const { message } = yield call(service, {
                method: 'put',
                url: '/api/scans',
                data: payload
            })
        } catch (err) {
            console.log(err);
        }
    })
}

function* callDeleteScans() {
    yield takeEvery(DELETE_SCANS, function* ({payload}) {
        try {
            yield call(service, {
                method: "delete",
                url: "/api/scans/"+payload.id,
            });
            yield put(getScans())
        } catch (error) {
            console.log(error);
        }
    });
}



export default function* rootSaga() {
    yield all([
        fork(callGetAllScans),
        fork(callPostNewScans),
        fork(callDeleteScans),
        fork(callGetSingleScans),
        fork(callGetScansAgent),
        fork(callGetScansDomains),
        fork(callGetScansKeywords),
        fork(callGetScansHistories),
        fork(callGetOneScansHistories),
        fork(callGetOneScansHistoriesResult),
        fork(callGetScanWebResult),
        fork(callGetScanHtmlCurrent),
        fork(callGetScanHtmlPrevious),
        fork(editScan),
    ]);
}