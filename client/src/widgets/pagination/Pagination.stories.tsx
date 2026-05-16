import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pagination } from './Pagination'
import { useState } from 'react'

const meta: Meta<typeof Pagination> = {
    title: 'Widgets/Pagination',
    component: Pagination,
}

export default meta

type Story = StoryObj<typeof Pagination>
type PaginationStoryArgs = React.ComponentProps<typeof Pagination>

const PaginationWithState = (args: PaginationStoryArgs) => {
    const [page, setPage] = useState(args.page)

    return <Pagination {...args} page={page} onChange={setPage} />
}

export const Default: Story = {
    render: PaginationWithState,
    args: {
        page: 3,
        total: 120,
        limit: 10,
    },
}

export const FirstPage: Story = {
    render: PaginationWithState,
    args: {
        page: 1,
        total: 120,
        limit: 10,
    },
}

export const MiddlePage: Story = {
    render: PaginationWithState,
    args: {
        page: 6,
        total: 120,
        limit: 10,
    },
}

export const LastPage: Story = {
    render: PaginationWithState,
    args: {
        page: 12,
        total: 120,
        limit: 10,
    },
}
