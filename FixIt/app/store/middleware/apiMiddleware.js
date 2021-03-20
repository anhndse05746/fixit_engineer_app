import axios from 'axios'

import { apiCallBegan, apiCallFailed, apiCallSuccess } from '../apiActions'
import { BASE_URL } from '../../config/apiConfig'

const api = ({ dispatch }) => next => async action => {

    if (action.type !== apiCallBegan.type) return next(action)

    //Extract data for request
    const { url, method, headers, data, onStart, onSuccess, onError } = action.payload
    //console.log(`api middleware: ${data}`)

    if (onStart) dispatch({ type: onStart })

    next(action)

    try {
        const response = await axios.request({
            baseURL: BASE_URL,
            url,
            method,
            headers,
            data
        })

        //general 
        dispatch(apiCallSuccess(response.data.results))

        //specific
        if (onSuccess) dispatch({ type: onSuccess, payload: response.data.results })


    } catch (error) {
        console.log(error)
        //general
        dispatch(apiCallFailed(error.message))

        //specific
        if (onError) dispatch({ type: onError, payload: error.message })
    }

}

export default api