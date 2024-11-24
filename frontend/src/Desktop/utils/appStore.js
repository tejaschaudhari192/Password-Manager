import { configureStore } from '@reduxjs/toolkit'
import passwordReducer from './passwordSlice.js'
const appStore = configureStore({
    reducer: {
        passwords: passwordReducer
    }
})

export default appStore;