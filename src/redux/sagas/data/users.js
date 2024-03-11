import { all, takeEvery, put, fork, call } from 'redux-saga/effects';

import {DELETE_USER, GET_USER, POST_NEW_AGENTS, POST_NEW_USER} from "../../constants/data";
import {getAllUsers, updateDataState} from "../../actions/data";
import service from "../../../auth/FetchInterceptor";
import history from "../../../history";

function* callGetAllUsers() {
    yield takeEvery(GET_USER, function* ({payload}) {
        try {
            const data = yield call(service, {
                method: "get",
                url: "/api/users",
                params: payload?.params
            });
            yield put(updateDataState({users: data}));
        } catch (error) {
            console.log(error);
        }
    });
}

function* callPostNewUsers() {
    yield takeEvery(POST_NEW_USER, function* ({payload}) {
        try {
             yield call(service, {
                method: "post",
                url: "/api/users",
                data: payload.data,
                params: payload?.params
            });
            history.go(-1)
        } catch (error) {
            console.log(error);
        }
    });
}

function* callDeleteUsers() {
    yield takeEvery(DELETE_USER, function* ({payload}) {
        try {
             yield call(service, {
                method: "delete",
                url: "/api/users/"+payload.id,
            });
            yield put(getAllUsers())
        } catch (error) {
            console.log(error);
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(callGetAllUsers),
        fork(callPostNewUsers),
        fork(callDeleteUsers),
    ]);
}