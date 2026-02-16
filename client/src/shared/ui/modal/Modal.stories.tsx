import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Modal } from './Modal'
import { Button } from '@/shared/ui/button/Button'

const meta: Meta<typeof Modal> = {
    title: 'UI/Modal',
    component: Modal,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
}

export default meta

type Story = StoryObj<typeof Modal>

const ModalExample = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Open modal</Button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div style={{ padding: 20 }}>
                    <h3>Modal Title</h3>
                    <p>Some content inside modal</p>
                    <Button onClick={() => setIsOpen(false)}>Close</Button>
                </div>
            </Modal>
        </>
    )
}

export const Default: Story = {
    render: () => <ModalExample />,
}
