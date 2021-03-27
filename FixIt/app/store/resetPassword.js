import { createSlice } from '@reduxjs/toolkit'

import { apiCallBegan } from './apiActions'
import constants from '../utils/constants'

const reset = createSlice({
    name: 'reset',
    initialState: {
        loading: false,
        isRegistered: false,
        isReset: false,
        message: ''
    },
    reducers: {
        resetRequested: (reset, action) => {
            reset.message = ''
            reset.isRegistered = false
            reset.isReset = false
        },
        resetSuccessful: (reset, action) => {
            console.log(action)
            if (action.payload === true) {
                reset.isReset = true
                reset.message = constants.RESET_PASSWORD_SUCCESSFULLY
                reset.loading = false
            } else {
                reset.message = "Đã có lỗi xảy ra. Vui lòng thử lại"
            }
        },
        resetFailed: (reset, action) => {
            console.log(action)
            reset.message = action.payload
            reset.loading = false
            return;
        },
        checkRegistered: (register, action) => {
            console.log(action)
            if (action.payload === "Phone number is not registered") {
                register.isRegistered = false
                register.message = constants.PHONE_NUMBER_IS_NOT_REGISTERED
            }
            else {
                register.isRegistered = true
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

export default reset.reducer
export const { resetRequested, resetSuccessful, resetFailed, checkRegistered, checkRegisteredFail } = reset.actions

export const resetPassword = (phoneNumber, newPassword) => apiCallBegan({
    url: '/resetPassword',
    data: {
        phone_number: phoneNumber,
        new_password: newPassword,
        role_id: constants.ROLE_REPAIRER,
    },
    method: 'POST',
    onStart: resetRequested.type,
    onSuccess: resetSuccessful.type,
    onError: resetFailed.type
})

export const checkRegisteredUser = (phoneNumber) => apiCallBegan({
    url: '/checkRegistered',
    data: {
        phone_number: phoneNumber,
        role_id: constants.ROLE_REPAIRER
    },
    method: 'POST',
    onStart: resetRequested.type,
    onSuccess: checkRegistered.type,
    onError: checkRegisteredFail.type
})