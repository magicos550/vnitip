import { configureStore } from '@reduxjs/toolkit'

import logger from 'redux-logger'

import userReducer from './slices/userSlice'
import settingsReducer from './slices/settingsSlice'

const reducer = {
  user: userReducer,
  settings: settingsReducer
}

const preloadedState = {
  user: {id: null},
  settings: {
    area: '',
    housing: '',
    line: ''
  }
}

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
})

export type RootState = ReturnType<typeof store.getState>