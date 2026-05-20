import { Provider } from 'react-redux'
import { setupStore } from '@/store/store'
import type { FC } from 'react'
import type { RootState } from '@/store/store'

export const withStore = (mockState?: Partial<RootState>) => {
    const store = setupStore(mockState)

    return (Story: FC) => (
        <Provider store={store}>
            <Story />
        </Provider>
    )
}
