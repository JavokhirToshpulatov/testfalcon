import { all, takeEvery, put, fork, call } from 'redux-saga/effects';

import {DELETE_DOMAINS, DELETE_USER, GET_DOMAINS, POST_NEW_AGENTS, POST_NEW_DOMAINS} from "../../constants/data";
import {updateDataState} from "../../actions/data";
import service from "../../../auth/FetchInterceptor";

function* callGetAllDomains() {
    yield takeEvery(GET_DOMAINS, function* ({payload}) {
        try {
            const data = yield call(service, {
                method: "get",
                url: "/api/targets",
                params: payload?.params
            });
            // yield put(updateDataState({allAgents: data}));
            console.log(data);
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
        fork(callGetAllDomains()),
        fork(callPostNewDomains()),
        fork(callDeleteDomains()),
    ]);
}