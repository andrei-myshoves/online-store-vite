import type { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'
import { setupStore } from '@/store/store'
import { SellerProfilePage } from './SellerProfilePage'

const store = setupStore({
    seller: {
        profile: {
            id: '1',
            username: 'Bert',
            city: 'West Rosina',
            avatar: null,
            createdAt: '2021-08-01',
        },
        advertisements: [
            {
                id: '1',
                title: 'Frozen Granite Computer',
                price: 84561,
                city: 'Санкт-Петербург',
                createdAt: 'Сегодня',
                images: ['https://picsum.photos/300/200?1'],
            },
            {
                id: '2',
                title: 'Elegant Ceramic Shirt',
                price: 80763,
                city: 'Санкт-Петербург',
                createdAt: 'Сегодня',
                images: ['https://picsum.photos/300/200?2'],
            },
            {
                id: '3',
                title: 'Modern Granite Sausages',
                price: 42660,
                city: 'Санкт-Петербург',
                createdAt: 'Сегодня',
                images: ['https://picsum.photos/300/200?3'],
            },
            {
                id: '4',
                title: 'Tasty Silk Chair',
                price: 83203,
                city: 'Санкт-Петербург',
                createdAt: 'Сегодня',
                images: ['https://picsum.photos/300/200?4'],
            },
        ],
        total: 4,
        page: 1,
        isProfileLoading: false,
        isAdvertisementsLoading: false,
        error: null,
    },
})

const originalDispatch = store.dispatch

store.dispatch = (action: any) => {
    if (typeof action === 'function') return null
    return originalDispatch(action)
}

const meta: Meta<typeof SellerProfilePage> = {
    title: 'Pages/SellerProfilePage',
    component: SellerProfilePage,
    decorators: [
        Story => (
            <Provider store={store}>
                <Story />
            </Provider>
        ),
    ],
}

export default meta

type Story = StoryObj<typeof SellerProfilePage>

export const Default: Story = {}
