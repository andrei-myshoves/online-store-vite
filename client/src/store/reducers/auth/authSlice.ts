import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type User = {
    id: number
    email: string
    username: string
}

interface AuthState {
    email: string
    password: string
    username: string
    user: User | null
}

const initialState: AuthState = {
    email: '',
    password: '',
    username: '',
    user: null,
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
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        },
    },
})

export const { setEmail, setPassword, setUsername, setUser } = authSlice.actions
export default authSlice.reducer
