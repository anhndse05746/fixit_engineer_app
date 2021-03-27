import { createSlice } from '@reduxjs/toolkit'

import { apiCallBegan } from './apiActions'
import constants from '../utils/constants'

const register = createSlice({
    name: 'register',
    initialState: {
        loading: false,
        isRegistered: true,
        message: ''
    },
    reducers: {
        registerRequested: (register, action) => {
            console.log(action)
            register.message = ''
            register.isRegistered = true
            register.sendOTP = true
        },
        registeredSuccessful: (register, action) => {
            console.log(action)
            register.message = constants.REGISTER_SUCCESSFULLY
            register.loading = false
        },
        registerFailed: (register, action) => {
            console.log(action)
            register.message = action.payload
            register.loading = false
            return;
        },
        checkRegistered: (register, action) => {
            console.log(action)
            if (action.payload === "Phone number is registed") {
                register.isRegistered = true
                register.message = constants.PHONE_NUMBER_REGISTERED
            }
            else {
                register.isRegistered = false
            }
            register.loading = false
        },
        checkRegisteredFail: (register, action) => {
            console.log(action)
            register.loading = false
            return;
        },
    }
})

export default register.reducer
export const { registerRequested, registeredSuccessful, registerFailed, checkRegistered, checkRegisteredFail } = register.actions

export const registerUser = (phoneNumber, password, name, email) => apiCallBegan({
    url: '/register',
    data: {
        phone_number: phoneNumber,
        password: password,
        name: name,
        role_id: constants.ROLE_REPAIRER,
        email: email
    },
    method: 'POST',
    onStart: registerRequested.type,
    onSuccess: registeredSuccessful.type,
    onError: registerFailed.type
})

export const checkRegisteredUser = (phoneNumber) => apiCallBegan({
    url: '/checkRegistered',
    data: {
        phone_number: phoneNumber,
        role_id: constants.ROLE_REPAIRER
    },
    method: 'POST',
    onStart: registerRequested.type,
    onSuccess: checkRegistered.type,
    onError: checkRegisteredFail.type
})