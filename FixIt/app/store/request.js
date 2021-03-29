import { createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from './apiActions';
import constants from '../utils/constants';

const request = createSlice({
    name: 'request',
    initialState: {
        message: '',
        isLoading: false,
        listRequest: [],
        requestDetail: {},
        onGoingRequests: [],
        executingRequest: [],
        completeRequest: [],
        canceledRequest: []
    },
    reducers: {
        onRequestStarted: (request, action) => {
            console.log(action)
            request.message = ''
            request.requestDetail = {}
            request.isLoading = true
        },
        clearMessage: (request, action) => {
            console.log(action)
            request.message = ''
        },
        listRequestSuccess: (request, action) => {
            console.log(action)
            request.isLoading = false
            request.listRequest = action.payload
        },
        listRequestFail: (request, action) => {
            console.log(action)
            request.isLoading = false
        },
        listMyRequestSuccess: (request, action) => {
            console.log(action)
            request.isLoading = false
            request.onGoingRequests = action.payload.listFindingRequest
            request.executingRequest = action.payload.listProcessingRequest
            request.completeRequest = action.payload.listCompletedRequest
            request.canceledRequest = action.payload.listCancelledRequest
        },
        listMyRequestFail: (request, action) => {
            console.log(action)
            request.isLoading = false
        },
        updateListRequestSuccess: (request, action) => {
            console.log(action)
            request.isLoading = false
        },
        updateListRequestFail: (request, action) => {
            console.log(action)
            request.isLoading = false
        },
        getRequestDetailSuccess: (request, action) => {
            console.log(action)
            request.isLoading = false
            request.requestDetail = action.payload
            console.log(request.requestDetail)
        },
        getRequestDetailFail: (request, action) => {
            console.log(action)
            request.isLoading = false
        },
    }
})

export default request.reducer
export const { onRequestStarted, clearMessage, listRequestFail, listRequestSuccess, listMyRequestFail, listMyRequestSuccess, updateListRequestFail, updateListRequestSuccess, getRequestDetailFail, getRequestDetailSuccess } = request.actions


export const listRequest = (token, repairer_id) => apiCallBegan({
    url: '/api/getRequestList',
    headers: {
        Authorization: token,
    },
    data: {
        repairer_id: repairer_id
    },
    method: 'POST',
    onStart: onRequestStarted.type,
    onSuccess: listRequestSuccess.type,
    onError: listRequestFail.type,
})

// export const updateListRequest = (token, customer_id, status) => apiCallBegan({
//     url: '/api/',
//     headers: {
//         Authorization: token,
//     },
//     data: {
//         customer_id: customer_id
//     },
//     method: 'POST',
//     onStart: onRequestStarted.type,
//     onSuccess: '',
//     onError: '',
// })

// export const getRequestDetail = (token, request_id) => apiCallBegan({
//     url: '/api/getRequestDetail',
//     headers: {
//         Authorization: token,
//     },
//     data: {
//         request_id: request_id
//     },
//     method: 'POST',
//     onStart: onRequestStarted.type,
//     onSuccess: getRequestDetailSuccess.type,
//     onError: getRequestDetailFail.type,
// })