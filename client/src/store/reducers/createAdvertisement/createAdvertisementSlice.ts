import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createAdThunk } from './createAdvertisementThunks'

type FormState = {
    name: string
    description: string
    price: string
}

type CreateAdvertisementState = {
    isModalOpen: boolean
    loading: boolean
    error?: string
    form: FormState
    images: File[]
}

const initialState: CreateAdvertisementState = {
    isModalOpen: false,
    loading: false,
    error: undefined,
    form: {
        name: '',
        description: '',
        price: '',
    },
    images: [],
}

const createAdvertisementSlice = createSlice({
    name: 'createAdvertisement',
    initialState,
    reducers: {
        openModal: state => {
            state.isModalOpen = true
        },
        closeModal: state => {
            state.isModalOpen = false
            state.error = undefined
        },
        setName: (state, action: PayloadAction<string>) => {
            state.form.name = action.payload
        },
        setDescription: (state, action: PayloadAction<string>) => {
            state.form.description = action.payload
        },
        setPrice: (state, action: PayloadAction<string>) => {
            state.form.price = action.payload
        },
        setImages: (state, action: PayloadAction<File[]>) => {
            state.images = action.payload
        },
        addImage: (state, action: PayloadAction<File>) => {
            state.images.push(action.payload)
        },
        removeImage: (state, action: PayloadAction<number>) => {
            state.images.splice(action.payload, 1)
        },
        clearImages: state => {
            state.images = []
        },
    },
    extraReducers: builder => {
        builder
            .addCase(createAdThunk.pending, state => {
                state.loading = true
                state.error = undefined
            })
            .addCase(createAdThunk.fulfilled, state => {
                state.loading = false
                state.isModalOpen = false

                state.form = {
                    name: '',
                    description: '',
                    price: '',
                }
            })
            .addCase(createAdThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(createAdThunk.fulfilled, state => {
                state.loading = false
                state.isModalOpen = false

                state.form = {
                    name: '',
                    description: '',
                    price: '',
                }

                state.images = []
            })
    },
})

export const {
    openModal,
    closeModal,
    setName,
    setDescription,
    setPrice,
    setImages,
    addImage,
    removeImage,
    clearImages,
} = createAdvertisementSlice.actions

export default createAdvertisementSlice.reducer
