import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface iUser {
  id: string | null
}

const initialState = { id: null } as iUser

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<iUser>) {
      state.id = action.payload.id
    },
    logout(state) {
      state.id = null
    },
  },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
