import { all, takeEvery, put, fork, call } from 'redux-saga/effects';

import {
    DELETE_AGENTS,
    DELETE_USER,
    GET_AGENTS, GET_AGENTS_SCAN,
    GET_DOMAINS,
    GET_SCANS,
    GET_SINGLE_AGENT,
    POST_NEW_AGENTS
} from "../../constants/data";
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
            yield put(updateDataState({allAgents: data}));
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
            yield call(service, {
                method: "delete",
                url: "/api/agents/"+payload.id,
            });
            yield put()
        } catch (error) {
            console.log(error);
        }
    });
}

function* callGetSingleAgents() {
    yield takeEvery(GET_SINGLE_AGENT, function* ({payload}) {
        try {
            const data = yield call(service, {
                method: "get",
                url: "/api/agents/"+payload.id,
            });
            yield put(updateDataState({singleAgents: data}));
        } catch (error) {
            console.log(error);
        }
    });
}
function* callGetAgentsScans() {
    yield takeEvery(GET_AGENTS_SCAN, function* ({payload}) {
        try {
            const data = yield call(service, {
                method: "get",
                url: "/api/agents/scans",
                params:payload?.params
            });
            yield put(updateDataState({domainScans: data}));
        } catch (error) {
            console.log(error);
        }
    });
}




export default function* rootSaga() {
    yield all([
        fork(callGetAllAgents),
        fork(callPostNewAgents),
        fork(callDeleteAgents),
        fork(callGetSingleAgents),
        fork(callGetAgentsScans)
    ]);
}