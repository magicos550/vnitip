import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface iAppraisalState {
  [key: string]: iAppraisalItem
}

export interface iAppraisalItem {
  ID: number
  User: string
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
    },
    removeAll() {
      return initialState
    },
  },
})

export const { load, add, edit, remove, removeAll } = appraisalSlice.actions

export default appraisalSlice.reducer
