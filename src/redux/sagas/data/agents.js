import { all, takeEvery, put, fork, call } from 'redux-saga/effects';

import {
    DELETE_AGENTS, EDIT_AGENTS, EDIT_USER,
    GET_AGENTS, GET_AGENTS_SCAN,
    GET_SINGLE_AGENT,
    POST_NEW_AGENTS
} from "../../constants/data";
import {getAllAgents, updateDataState} from "../../actions/data";
import service from "../../../auth/FetchInterceptor";
import history from "../../../history";


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
            yield call(service, {
                method: "post",
                url: "/api/agents",
                data: payload.data,
                params: payload?.params
            });
            history.go(-1)
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
            yield put(getAllAgents())
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

export function* editAgent() {
    yield takeEvery(EDIT_AGENTS, function* ({ payload = {} }) {
        try {
            const { message } = yield call(service, {
                method: 'put',
                url: '/api/agents',
                data: payload
            })
        } catch (err) {
            console.log(err);
        }
    })
}



export default function* rootSaga() {
    yield all([
        fork(callGetAllAgents),
        fork(callPostNewAgents),
        fork(callDeleteAgents),
        fork(callGetSingleAgents),
        fork(callGetAgentsScans),
        fork(editAgent)
    ]);
}