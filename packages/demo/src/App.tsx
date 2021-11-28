import React from 'react'
import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import { customTheme } from './theme'
import { Layout } from './Layout'
import { Icon1Provider } from '@icon1/react/Icon1Provider'

const theme = customTheme('#4f2ab5')

export const App: React.ComponentType<{}> = () => {
    const [themeId] = React.useState<'dark' | 'light'>('dark')

    const [t, sT] = React.useState(theme[themeId])
    React.useEffect(() => {
        sT({...theme[themeId]})
    }, [sT, themeId])

    return <MuiThemeProvider theme={t}>
        <CssBaseline/>
        <Icon1Provider api={'http://localhost:3030'}>
            <Layout/>
        </Icon1Provider>
    </MuiThemeProvider>
}
