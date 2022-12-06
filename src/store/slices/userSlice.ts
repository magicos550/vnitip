import { createSlice , type PayloadAction } from '@reduxjs/toolkit'

interface iUserInterface {
    id: string | null
}

const initialState = {id: null} as iUserInterface;

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login (state , action: PayloadAction<iUserInterface>) {
            state.id = action.payload.id
        },
        logout (state) {
            state.id = ''
        }
    }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer