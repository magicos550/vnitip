import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface iEggMassState {
  [key: string]: iEggMassItem
}

export interface iEggMassItem {
  ID: number
  Barcode: string
  Mass: number
  Date: string
}

const initialState: iEggMassState = {}

const eggMassSlice = createSlice({
  name: 'egg_mass',
  initialState,
  reducers: {
    load(state, action: PayloadAction<iEggMassItem[]>) {
      return action.payload.reduce<Record<string, any>>(
        (acc, item) => ((acc[String(item.ID)] = item), acc),
        {},
      )
    },
    add(state, action: PayloadAction<iEggMassItem>) {
      state[action.payload.ID] = action.payload
    },
    edit(state, action: PayloadAction<iEggMassItem>) {
      state[action.payload.ID] = action.payload
    },
    remove(state, action: PayloadAction<number>) {
      delete state[action.payload]
      // return state[action.payload].filter((e: iEggMassItem) => e.ID !== action.payload)
    },
  },
})

export const { load, add, edit, remove } = eggMassSlice.actions

export default eggMassSlice.reducer
