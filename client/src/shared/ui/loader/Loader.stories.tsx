import type { Meta, StoryObj } from '@storybook/react'
import { Loader } from './Loader'

const meta: Meta<typeof Loader> = {
    title: 'UI/Loader',
    component: Loader,
}

export default meta

type Story = StoryObj<typeof Loader>

export const Default: Story = {}

export const Centered: Story = {
    render: () => (
        <div
            style={{
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Loader />
        </div>
    ),
}
