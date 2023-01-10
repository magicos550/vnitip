import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface iEggCollectionItem {
  ID: number
  Barcode: string
  Date: string
}

const initialState: iEggCollectionItem[] = []

const eggCollectionSlice = createSlice({
  name: 'egg_collection',
  initialState,
  reducers: {
    load(state, action: PayloadAction<iEggCollectionItem[]>) {
      return action.payload
    },
    add(state, action: PayloadAction<iEggCollectionItem>) {
      state.push(action.payload)
    },
    remove(state, action: PayloadAction<number>) {
      return state.filter((e: iEggCollectionItem) => e.ID !== action.payload)
    },
  },
})

export const { add, remove, load } = eggCollectionSlice.actions

export default eggCollectionSlice.reducer
