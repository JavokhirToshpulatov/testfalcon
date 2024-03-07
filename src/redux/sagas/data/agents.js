import { all, takeEvery, put, fork, call } from 'redux-saga/effects';

import {DELETE_AGENTS, DELETE_USER, GET_AGENTS, GET_DOMAINS, GET_SCANS, POST_NEW_AGENTS} from "../../constants/data";
import {updateDataState} from "../../actions/data";
import service from "../../../auth/FetchInterceptor";


function* callGetAllAgents() {
    yield takeEvery(GET_AGENTS, function* ({payload}) {
        try {
            const data = yield call(service, {
                method: "get",
                url: "/api/agents",
                params: payload?.params
            });
            // yield put(updateDataState({allAgents: data}));
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    });
}



function* callPostNewAgents() {
    yield takeEvery(POST_NEW_AGENTS, function* ({payload}) {
        try {
            const data = yield call(service, {
                method: "post",
                url: "/api/agents",
                data: payload.data,
                params: payload?.params
            });

            console.log(data);
        } catch (error) {
            console.log(error);
        }
    });
}

function* callDeleteAgents() {
    yield takeEvery(DELETE_AGENTS, function* ({payload}) {
        try {
            const data = yield call(service, {
                method: "delete",
                url: "/api/agents/"+payload.id,
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
        fork(callGetAllAgents),
        fork(callPostNewAgents),
        fork(callDeleteAgents)
    ]);
}