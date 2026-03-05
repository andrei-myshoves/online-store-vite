import type { Preview } from '@storybook/react'
import { withRouter } from '../src/shared/storybook/withRouter'
import '../src/style.css'

const preview: Preview = {
    decorators: [withRouter],
}

export default preview
