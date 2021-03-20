import { createSlice } from '@reduxjs/toolkit'

import { apiCallBegan } from './apiActions'
import constants from '../utils/constants'

const majors = createSlice({
    name: 'majors',
    initialState: {
        majorsList: [],
        loading: false,
        message: ''
    },
    reducers: {
        majorsRequested: (majors, action) => {
            majors.message = ''
            majors.loading = true
        },
        majorsRequestSuccessful: (majors, action) => {
            console.log(action)
            majors.majorsList = action.payload
            majors.loading = false
        },
        majorsRequestFailed: (majors, action) => {
            console.log(action)
            majors.loading = false
            return;
        },
    }
})

export const LOGGED_IN = 'logged in'

export default majors.reducer
export const { majorsRequested, majorsRequestSuccessful, majorsRequestFailed } = majors.actions

export const loadMajors = (token) => apiCallBegan({
    url: '/api/getMajor',
    method: 'GET',
    headers: {
        Authorization: token
    },
    onStart: majorsRequested.type,
    onSuccess: majorsRequestSuccessful.type,
    onError: majorsRequestFailed.type
})
