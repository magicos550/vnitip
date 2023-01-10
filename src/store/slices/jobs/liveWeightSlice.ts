import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface iLiveWeightItem {
  ID: number
  Barcode: string
  Mass: number
  Date: string
}

const initialState: iLiveWeightItem[] = []

const liveWeightSlice = createSlice({
  name: 'live_weight',
  initialState,
  reducers: {
    load(state, action: PayloadAction<iLiveWeightItem[]>) {
      return action.payload
    },
    add(state, action: PayloadAction<iLiveWeightItem>) {
      state.push(action.payload)
    },
    remove(state, action: PayloadAction<number>) {
      return state.filter((e: iLiveWeightItem) => e.ID !== action.payload)
    },
  },
})

export const { add, remove, load } = liveWeightSlice.actions

export default liveWeightSlice.reducer
