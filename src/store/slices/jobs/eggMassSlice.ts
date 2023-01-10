import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface iEggMassItem {
  ID: number
  Barcode: string
  Mass: number
  Date: string
}

const initialState: iEggMassItem[] = []

const eggMassSlice = createSlice({
  name: 'egg_mass',
  initialState,
  reducers: {
    load(state, action: PayloadAction<iEggMassItem[]>) {
      return action.payload
    },
    add(state, action: PayloadAction<iEggMassItem>) {
      state.push(action.payload)
    },
    remove(state, action: PayloadAction<number>) {
      return state.filter((e: iEggMassItem) => e.ID !== action.payload)
    },
  },
})

export const { add, remove, load } = eggMassSlice.actions

export default eggMassSlice.reducer
