import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
    email: string
    password: string
    username: string
}

const initialState: AuthState = {
    email: '',
    password: '',
    username: '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
    },
})

export const { setEmail, setPassword, setUsername } = authSlice.actions
export default authSlice.reducer
