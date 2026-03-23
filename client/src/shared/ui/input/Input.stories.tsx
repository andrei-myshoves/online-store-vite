import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'
import { useState } from 'react'

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

export const WithLabel: Story = {
    args: {
        label: 'Имя',
        placeholder: 'Введите имя',
    },
}

export const WithLabelAndValue: Story = {
    args: {
        label: 'Имя',
        value: 'Андрей',
    },
}

export const WithErrorText: Story = {
    args: {
        label: 'Имя',
        value: 'Ошибка',
        error: true,
        errorText: 'Поле заполнено неверно',
    },
}

export const Interactive: Story = {
    render: function Render(args) {
        const [value, setValue] = useState('')

        return <Input {...args} label="Имя" value={value} onChange={e => setValue(e.target.value)} />
    },
}

export const ProfileStyle: Story = {
    args: {
        label: 'Телефон',
        placeholder: '+48 123 456 789',
    },
    decorators: [Story => <Story />],
}
