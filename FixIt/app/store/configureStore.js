import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import reducer from './reducers';
import api from './middleware/apiMiddleware'

const store = configureStore({
    reducer,
    middleware: [
        ...getDefaultMiddleware(),
        api
    ]
});

export default store;
