import type { Meta, StoryObj } from '@storybook/react-vite'
import ProfilePage from './ProfilePage'
import { withStore } from '@/shared/storybook/withStore'
import { profileMockState } from './ProfilePage.mock'

const meta: Meta<typeof ProfilePage> = {
    title: 'Pages/ProfilePage',
    component: ProfilePage,
}

export default meta

type Story = StoryObj<typeof ProfilePage>

export const Default: Story = {
    decorators: [withStore(profileMockState)],
}

export const Loading: Story = {
    decorators: [
        withStore({
            profile: {
                data: null,
                isLoading: true,
                error: null,
                isEditingProfile: false,
            },

            seller: {
                profile: null,
                advertisements: [],
                total: 0,
                page: 1,
                isProfileLoading: false,
                isAdvertisementsLoading: true,
                error: null,
            },
        }),
    ],
}

export const Error: Story = {
    decorators: [
        withStore({
            profile: {
                data: null,
                isLoading: false,
                error: 'Ошибка загрузки профиля',
                isEditingProfile: false,
            },
            seller: {
                profile: null,
                advertisements: [],
                total: 0,
                page: 1,
                isProfileLoading: false,
                isAdvertisementsLoading: false,
                error: null,
            },
        }),
    ],
}
