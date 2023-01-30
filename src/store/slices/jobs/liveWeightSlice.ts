import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface iLiveWeightState {
  [key: string]: iLiveWeightItem
}

export interface iLiveWeightItem {
  ID: number
  User: string
  Barcode: string
  Mass: number
  Date: string
}

const initialState: iLiveWeightState = {}

const liveWeightSlice = createSlice({
  name: 'live_weight',
  initialState,
  reducers: {
    load(state, action: PayloadAction<iLiveWeightItem[]>) {
      return action.payload.reduce<Record<string, any>>(
        (acc, item) => ((acc[String(item.ID)] = item), acc),
        {},
      )
    },
    add(state, action: PayloadAction<iLiveWeightItem>) {
      state[action.payload.ID] = action.payload
    },
    edit(state, action: PayloadAction<iLiveWeightItem>) {
      state[action.payload.ID] = action.payload
    },
    remove(state, action: PayloadAction<number>) {
      delete state[action.payload]
      // return state[action.payload].filter((e: iEggMassItem) => e.ID !== action.payload)
    },
    removeAll() {
      return initialState
    },
  },
})

export const { load, add, edit, remove, removeAll } = liveWeightSlice.actions

export default liveWeightSlice.reducer
