import {all} from 'redux-saga/effects';
import Auth from './Auth';
import agents from './data/agents';

export default function* rootSaga(getState) {
    yield all([
        Auth(),
        agents()
    ]);
}
