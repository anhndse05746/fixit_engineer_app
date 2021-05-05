import {createSlice} from '@reduxjs/toolkit';

import {apiCallBegan} from './apiActions';
import constants from '../utils/constants';

const user = createSlice({
  name: 'user',
  initialState: {
    userId: '',
    phoneNumber: '',
    name: '',
    roleId: '',
    email: '',
    loading: false,
    token: '',
    message: '',
    changePassMessage: '',
    updateUserMessage: '',
    is_verify: '',
    city: '',
    district: '',
    address: '',
    major: '',
    identity_card_number: '',
  },
  reducers: {
    usersRequested: (users, action) => {
      console.log(action);
      users.message = '';
      users.changePassMessage = '';
      users.updateUserMessage = '';
      users.loading = true;
    },
    usersLoggedIn: (users, action) => {
      console.log(action);
      users.userId = action.payload.id;
      users.phoneNumber = action.payload.phone;
      users.name = action.payload.name;
      users.roleId = action.payload.roleId;
      users.email = action.payload.email;
      users.token = action.payload.token;
      users.city = action.payload.city;
      users.district = action.payload.district;
      users.is_verify = action.payload.is_verify;
      users.address = action.payload.address;
      users.major = action.payload.major_id;
      users.identity_card_number = action.payload.identity_card_number;
      users.message = LOGGED_IN;
      users.loading = false;
    },
    usersLoginFailed: (users, action) => {
      console.log(action);
      users.message = constants.LOGIN_FAIL_MESSAGE;
      users.loading = false;
      return;
    },
    usersUpdated: (users, action) => {
      console.log(action);
      users.name = action.payload.name;
      users.email = action.payload.email;
      users.updateUserMessage = constants.UPDATE_SUCCESSFULLY;
      users.loading = false;
    },
    usersUpdateFailed: (users, action) => {
      console.log(action);
      users.message = '';
      users.loading = false;
      return;
    },
    userChangePasswordSuccess: (users, action) => {
      console.log(action);
      if (action.payload == 'success') {
        users.changePassMessage = constants.RESET_PASSWORD_SUCCESSFULLY;
      } else if (action.payload == 'Incorrect password') {
        users.changePassMessage = constants.OLD_PASSWORD_IS_NOT_CORRECT;
      }
    },
    userChangePasswordFail: (users, action) => {
      console.log(action);
    },
  },
});

export const LOGGED_IN = 'logged in';

export default user.reducer;
export const {
  usersRequested,
  usersLoggedIn,
  usersLoginFailed,
  userChangePasswordFail,
  userChangePasswordSuccess,
  usersUpdateFailed,
  usersUpdated,
  userUpdateDeviceToken,
} = user.actions;

export const loadUsers = (username, password, device_token) =>
  apiCallBegan({
    url: '/login',
    data: {
      phone_number: username,
      password: password,
      role_id: constants.ROLE_REPAIRER,
      device_token: device_token,
    },
    method: 'POST',
    onStart: usersRequested.type,
    onSuccess: usersLoggedIn.type,
    onError: usersLoginFailed.type,
  });

export const changePassword = (phone, token, old_password, new_password) =>
  apiCallBegan({
    url: '/api/changePassword',
    headers: {
      Authorization: token,
    },
    data: {
      phone_number: phone,
      old_password: old_password,
      new_password: new_password,
      role_id: constants.ROLE_REPAIRER,
    },
    method: 'POST',
    onStart: usersRequested.type,
    onSuccess: userChangePasswordSuccess.type,
    onError: userChangePasswordFail.type,
  });

export const updateUser = (
  id,
  phone,
  token,
  name,
  email,
  district,
  city,
  address,
  identity_card_number,
) =>
  apiCallBegan({
    url: '/api/updateUser',
    headers: {
      Authorization: token,
    },
    data: {
      user_id: id,
      name: name,
      email: email,
      phone: phone,
      role_id: constants.ROLE_REPAIRER,
      district: district,
      city: city,
      address: address,
      identity_card_number: identity_card_number,
    },
    method: 'POST',
    onStart: usersRequested.type,
    onSuccess: usersUpdated.type,
    onError: usersUpdateFailed.type,
  });
