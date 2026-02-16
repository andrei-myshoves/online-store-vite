import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
    title: 'UI/Button',
    component: Button,
    tags: ['autodocs'],
    args: {
        children: 'Button',
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'outline', 'outlineReverse', 'wrapper'],
        },
    },
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
    args: {
        variant: 'primary',
    },
}

export const Outline: Story = {
    args: {
        variant: 'outline',
    },
}

export const OutlineReverse: Story = {
    args: {
        variant: 'outlineReverse',
    },
}

export const Wrapper: Story = {
    args: {
        variant: 'wrapper',
    },
}

export const Disabled: Story = {
    args: {
        disabled: true,
    },
}
