import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { useDispatch, useSelector } from 'react-redux'

import userReducer from './slices/userSlice'
import settingsReducer from './slices/settingsSlice'
import eggCollectionReducer from './slices/jobs/eggCollectionSlice'
import eggMassReducer from './slices/jobs/eggMassSlice'

const reducer = {
  user: userReducer,
  settings: settingsReducer,
  eggCollection: eggCollectionReducer,
  eggMass: eggMassReducer,
}

const preloadedState = {
  user: { id: null },
  settings: {
    area: '',
    housing: '',
    line: '',
  },
}

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
})

export type RootState = ReturnType<typeof store.getState>
export type appDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<appDispatch>()
export const useAppSelector = <Return>(callback: (state: RootState) => Return) =>
  useSelector((state: RootState) => callback(state))
