import type { Meta, StoryObj } from '@storybook/react-vite'
import AdvertisementPage from './AdvertisementPage'
import { withStore } from '@/shared/storybook/withStore'
import { advertisementMockState } from './AdvertisementPage.mock'

const meta: Meta<typeof AdvertisementPage> = {
    title: 'Pages/AdvertisementPage',
    component: AdvertisementPage,
}

export default meta

type Story = StoryObj<typeof AdvertisementPage>

export const Default: Story = {
    decorators: [withStore(advertisementMockState)],
}

export const Loading: Story = {
    decorators: [
        withStore({
            advertisement: {
                data: null,
                isLoading: true,
                error: null,
            },
        }),
    ],
}

export const Error: Story = {
    decorators: [
        withStore({
            advertisement: {
                data: null,
                isLoading: false,
                error: 'Ошибка загрузки объявления',
            },
        }),
    ],
}
