import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { iEggMassItem } from './eggMassSlice'
import { iLiveWeightItem } from './liveWeightSlice'

interface iAppraisalState {
  [key: string]: iLiveWeightItem
}

export interface iAppraisalItem {
  ID: number
  Barcode: string
  Mass: number
  Chest: number
  Legs: number
  Remark?: string
  Date: string
}

const initialState: iAppraisalState = {}

const appraisalSlice = createSlice({
  name: 'appraisal',
  initialState,
  reducers: {
    load(state, action: PayloadAction<iAppraisalItem[]>) {
      return action.payload.reduce<Record<string, any>>(
        (acc, item) => ((acc[String(item.ID)] = item), acc),
        {},
      )
    },
    add(state, action: PayloadAction<iAppraisalItem>) {
      state[action.payload.ID] = action.payload
    },
    edit(state, action: PayloadAction<iAppraisalItem>) {
      state[action.payload.ID] = action.payload
    },
    remove(state, action: PayloadAction<number>) {
      delete state[action.payload]
      // return state[action.payload].filter((e: iEggMassItem) => e.ID !== action.payload)
    },
  },
})

export const { load, add, edit, remove } = appraisalSlice.actions

export default appraisalSlice.reducer
