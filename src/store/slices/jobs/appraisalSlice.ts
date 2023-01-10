import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface iAppraisalItem {
  ID: number
  Barcode: string
  Mass: number
  Chest: number
  Legs: number
  Remark?: string
  Date: string
}

const initialState: iAppraisalItem[] = []

const appraisalSlice = createSlice({
  name: 'appraisal',
  initialState,
  reducers: {
    load(state, action: PayloadAction<iAppraisalItem[]>) {
      return action.payload
    },
    add(state, action: PayloadAction<iAppraisalItem>) {
      state.push(action.payload)
    },
    remove(state, action: PayloadAction<number>) {
      return state.filter((e: iAppraisalItem) => e.ID !== action.payload)
    },
  },
})

export const { add, remove, load } = appraisalSlice.actions

export default appraisalSlice.reducer
