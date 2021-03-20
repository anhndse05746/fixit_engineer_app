import { createSlice } from '@reduxjs/toolkit'

const appState = createSlice({
    name: 'app',
    initialState: {
        root: null,
        text: null,
        ready: false,
        foreground: null,
        background: false,
    },
    reducers: {
        appStateForeground: (app, action) => {
            app.foreground = true
            app.background = false
        },
        appStateBackground: (app, action) => {
            app.foreground = false
            app.background = true
        },
        appStateStart: (app, action) => {
            app.root = action.payload.root
            app.text = action.payload.text
        },
        appStateInit: (app, action) => {
            app.ready = false
        },
        appStateReady: (app, action) => {
            app.ready = true
        }
    }
})

export default appState.reducer
export const {
    appStateBackground,
    appStateForeground,
    appStateInit,
    appStateReady,
    appStateStart } = appState.actions