import { combineReducers } from 'redux';
import Auth from './Auth';
import Theme from './Theme';
import dataReducer from './data'

const reducers = combineReducers({
    theme: Theme,
    auth: Auth,
    data: dataReducer
});

export default reducers;