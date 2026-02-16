import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
    title: 'UI/Input',
    component: Input,
    tags: ['autodocs'],
    args: {
        placeholder: 'Enter text...',
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'outline'],
        },
        error: {
            control: 'boolean',
        },
    },
}

export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {}

export const Outline: Story = {
    args: {
        variant: 'outline',
    },
}

export const WithValue: Story = {
    args: {
        value: 'Hello world',
    },
}

export const Error: Story = {
    args: {
        value: 'Invalid input',
        error: true,
    },
}

export const Disabled: Story = {
    args: {
        value: 'Disabled',
        disabled: true,
    },
}
