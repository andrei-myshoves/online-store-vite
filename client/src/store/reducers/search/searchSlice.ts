import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type SearchState = {
    query: string
}

const initialState: SearchState = {
    query: '',
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload.trimStart()
        },
    },
})

export const { setQuery } = searchSlice.actions
export default searchSlice.reducer
