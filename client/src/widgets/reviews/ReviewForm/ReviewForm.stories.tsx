import type { Meta, StoryObj } from '@storybook/react'
import { ReviewForm } from './ReviewForm'

const meta: Meta<typeof ReviewForm> = {
    title: 'Widgets/ReviewForm',
    component: ReviewForm,
    tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ReviewForm>

export const Default: Story = {
    args: {},
}

export const Loading: Story = {
    args: {
        loading: true,
    },
}

export const Error: Story = {
    args: {
        error: 'Вы уже оставляли отзыв',
    },
}

export const Disabled: Story = {
    args: {
        disabled: true,
    },
}
