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
        },
        getRequestDetailFail: (request, action) => {
            console.log(action)
            request.isLoading = false
        },
        takeRequestSuccess: (request, action) => {
            console.log(action)
            if (action.payload !== "This request is taken") {
                request.message = constants.TAKE_REQUEST_SUCCESSFULLY
            }
            console.log(request.message)
            request.isLoading = false
        },
        takeRequestFail: (request, action) => {
            console.log(action)
            request.isLoading = false
        },
        createInvoiceSuccess: (request, action) => {
            console.log(action)
            if (action.payload != undefined) {
                request.message = constants.CREATE_INVOICE_SUCCESSFULLY
            }
            request.isLoading = false
        },
        createInvoiceFail: (request, action) => {
            console.log(action)
            request.isLoading = false
        },
        cancelRequestSuccess: (request, action) => {
            if (action.payload.message != 'Can not cancel this request') {
                request.message = constants.CANCEL_REQUEST_SUCCESSFULLY
            }
            console.log(action)
            request.isLoading = false
        },
        cancelRequestFail: (request, action) => {
            console.log(action)
            request.isLoading = false
        },
    }
})

export default request.reducer
export const { onRequestStarted,
    clearMessage,
    listRequestFail,
    listRequestSuccess,
    listMyRequestFail,
    listMyRequestSuccess,
    updateListRequestFail,
    updateListRequestSuccess,
    getRequestDetailFail,
    getRequestDetailSuccess,
    createInvoiceSuccess,
    createInvoiceFail,
    takeRequestFail,
    takeRequestSuccess,
    cancelRequestFail,
    cancelRequestSuccess } = request.actions


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

export const listAllRequest = (token, repairer_id) => apiCallBegan({
    url: '/api/getInitListRequest',
    headers: {
        Authorization: token,
    },
    data: {
        role: constants.ROLE_REPAIRER,
        customer_id: repairer_id
    },
    method: 'POST',
    onStart: onRequestStarted.type,
    onSuccess: listMyRequestSuccess.type,
    onError: listMyRequestFail.type,
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

export const getRequestDetail = (token, request_id) => apiCallBegan({
    url: '/api/getRequestDetail',
    headers: {
        Authorization: token,
    },
    data: {
        request_id: request_id
    },
    method: 'POST',
    onStart: onRequestStarted.type,
    onSuccess: getRequestDetailSuccess.type,
    onError: getRequestDetailFail.type,
})

export const takeRequest = (token, request_id, repairer_id) => apiCallBegan({
    url: '/api/repairer/takeRequest',
    headers: {
        Authorization: token,
    },
    data: {
        request_id: request_id,
        repairer_id: repairer_id
    },
    method: 'POST',
    onStart: onRequestStarted.type,
    onSuccess: takeRequestSuccess.type,
    onError: takeRequestFail.type,
})

export const cancelRequest = (token, request_id, cancel_reason) => apiCallBegan({
    url: '/api/cancelRequest',
    headers: {
        Authorization: token,
    },
    data: {
        request_id: request_id,
        cancel_by: constants.ROLE_REPAIRER,
        cancel_reason: cancel_reason
    },
    method: 'POST',
    onStart: onRequestStarted.type,
    onSuccess: cancelRequestSuccess.type,
    onError: cancelRequestFail.type,
})

export const createInvoice = (token, request_id, total_price, request_issues) => apiCallBegan({
    url: '/api/createInvoice',
    headers: {
        Authorization: token,
    },
    data: {
        request_id: request_id,
        payment_method_id: 1,
        status: "NOT_PAYMENT",
        total_price: total_price,
        request_issues: request_issues,
    },
    method: 'POST',
    onStart: onRequestStarted.type,
    onSuccess: createInvoiceSuccess.type,
    onError: createInvoiceFail.type,
})

