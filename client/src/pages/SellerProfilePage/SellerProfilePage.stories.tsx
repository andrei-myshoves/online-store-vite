import type { Meta, StoryObj } from '@storybook/react'
import { SellerProfilePage } from './SellerProfilePage'
import { withStore } from '@/shared/storybook/withStore'
import { sellerMockState } from './SellerProfilePage.mock'

const meta: Meta<typeof SellerProfilePage> = {
    title: 'Pages/SellerProfilePage',
    component: SellerProfilePage,
    decorators: [withStore(sellerMockState)],
}

export default meta

type Story = StoryObj<typeof SellerProfilePage>

export const Default: Story = {}
