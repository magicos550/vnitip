import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface iCollectionState {
  [key: string]: iEggCollectionItem
}

export interface iEggCollectionItem {
  ID: number
  User: string
  Barcode: string
  Date: string
}

const initialState: iCollectionState = {}

const eggCollectionSlice = createSlice({
  name: 'egg_collection',
  initialState,
  reducers: {
    load(state, action: PayloadAction<iEggCollectionItem[]>) {
      return action.payload.reduce<Record<string, any>>(
        (acc, item) => ((acc[String(item.ID)] = item), acc),
        {},
      )
    },
    add(state, action: PayloadAction<iEggCollectionItem>) {
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

export const { add, remove, load, removeAll } = eggCollectionSlice.actions

export default eggCollectionSlice.reducer
