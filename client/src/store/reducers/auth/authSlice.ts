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
    isAuthModalOpen: boolean
}

const initialState: AuthState = {
    email: '',
    password: '',
    username: '',
    user: null,
    isAuthModalOpen: false,
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

        openAuthModal: state => {
            state.isAuthModalOpen = true
        },
        closeAuthModal: state => {
            state.isAuthModalOpen = false
        },
    },
})

export const { setEmail, setPassword, setUsername, setUser, openAuthModal, closeAuthModal } = authSlice.actions
export default authSlice.reducer
