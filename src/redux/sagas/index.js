import {all} from 'redux-saga/effects';
import Auth from './Auth';
import agents from './data/agents';
import scans from './data/scans';
import users from './data/users';
import domains from './data/domains';
import keywords from './data/keywords';

export default function* rootSaga(getState) {
    yield all([
        Auth(),
        agents(),
        scans(),
        keywords(),
        domains(),
        users()
    ]);
}
