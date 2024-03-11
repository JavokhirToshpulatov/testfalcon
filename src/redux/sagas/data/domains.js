import { all, takeEvery, put, fork, call } from 'redux-saga/effects';

import {
    DELETE_DOMAINS,
    DELETE_USER, GET_DOMAIN_HISTORIES, GET_DOMAIN_SCANS,
    GET_DOMAINS, GET_SCANS_DOMAINS,
    GET_SINGLE_DOMAIN,
    POST_NEW_AGENTS,
    POST_NEW_DOMAINS
} from "../../constants/data";
import {getDomains, updateDataState} from "../../actions/data";
import service from "../../../auth/FetchInterceptor";

function* callGetAllDomains() {
    yield takeEvery(GET_DOMAINS, function* ({payload}) {
        try {
            const data = yield call(service, {
                method: "get",
                url: "/api/targets",
                params: payload?.params
            });
            yield put(updateDataState({domains: data}));
        } catch (error) {
            console.log(error);
        }
    });
}

function* callGetSingleDomains() {
    yield takeEvery(GET_SINGLE_DOMAIN, function* ({payload}) {
        try {
            const data = yield call(service, {
                method: "get",
                url: "/api/targets/"+payload?.id,
            });
            yield put(updateDataState({singleDomain: data}));
        } catch (error) {
            console.log(error);
        }
    });
}

function* callGetDomainScans() {
    yield takeEvery(GET_DOMAIN_SCANS, function* ({payload}) {
        try {
            const data = yield call(service, {
                method: "get",
                url: "/api/targets/scans",
                params:payload?.params
            });
            yield put(updateDataState({domainScans: data}));
        } catch (error) {
            console.log(error);
        }
    });
}

function* callGetDomainHistories() {
    yield takeEvery(GET_DOMAIN_HISTORIES, function* ({payload}) {
        try {
            const data = yield call(service, {
                method: "get",
                url: "/api/targets/histories",
                params:payload?.params
            });
            yield put(updateDataState({histories: data}));
        } catch (error) {
            console.log(error);
        }
    });
}

function* callPostNewDomains() {
    yield takeEvery(POST_NEW_DOMAINS, function* ({payload}) {
        try {
            const data = yield call(service, {
                method: "post",
                url: "/api/targets",
                data: payload.data,
                params: payload?.params
            });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    });
}


function* callDeleteDomains() {
    yield takeEvery(DELETE_DOMAINS, function* ({payload}) {
        try {
            const data = yield call(service, {
                method: "delete",
                url: "/api/targets/"+payload?.id,
            });
            yield put(getDomains());
        } catch (error) {
            console.log(error);
        }
    });
}



export default function* rootSaga() {
    yield all([
        fork(callGetAllDomains),
        fork(callPostNewDomains),
        fork(callDeleteDomains),
        fork(callGetSingleDomains),
        fork(callGetDomainScans),
        fork(callGetDomainHistories),
    ]);
}