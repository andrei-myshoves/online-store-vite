import type { Meta, StoryObj } from '@storybook/react'
import CatalogPage from './CatalogPage'
import { withStore } from '@/shared/storybook/withStore'
import { catalogMockState } from './CatalogPage.mock'

const meta: Meta<typeof CatalogPage> = {
    title: 'Pages/CatalogPage',
    component: CatalogPage,
}

export default meta

type Story = StoryObj<typeof CatalogPage>

export const Default: Story = {
    decorators: [withStore(catalogMockState)],
}

export const Loading: Story = {
    decorators: [
        withStore({
            catalog: {
                items: [],
                total: 0,
                page: 1,
                isLoading: true,
                error: null,
            },
        }),
    ],
}

export const Error: Story = {
    decorators: [
        withStore({
            catalog: {
                items: [],
                total: 0,
                page: 1,
                isLoading: false,
                error: 'Ошибка загрузки',
            },
        }),
    ],
}
