import { createSlice , type PayloadAction } from '@reduxjs/toolkit'

interface iSettingsInterface {
    area: string,
    housing: string,
    line: string
}

const initialState = {
    area: '',
    housing: '',
    line: ''
} as iSettingsInterface;

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        save (state , action: PayloadAction<iSettingsInterface>) {
            Object.keys(action.payload).forEach(item => state[item as keyof iSettingsInterface] = action.payload[item as keyof iSettingsInterface])
        }
    }
})

export const { save } = settingsSlice.actions

export default settingsSlice.reducer