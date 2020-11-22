import {combineReducers} from 'redux';
import login from './login';
import dashboard from './dashboard';

// we can add multiple reducers here ...
export default combineReducers({login, dashboard});
