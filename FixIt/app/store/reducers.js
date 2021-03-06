import { combineReducers } from 'redux';

import app from './appState';
import user from './user'
import register from './register'
import resetPassword from './resetPassword'
import majors from './majors'
import request from './request'
import notification from './notification'

export default combineReducers({
    app,
    user,
    register,
    resetPassword,
    majors,
    request,
    notification
});
