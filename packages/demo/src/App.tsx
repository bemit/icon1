import React from 'react'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import { customTheme } from './theme'
import { Layout } from './Layout'
import { Icon1Provider } from '@icon1/react/Icon1Provider'

const theme = customTheme('#9052ea', '#4f2ab5')

export const App: React.ComponentType<{}> = () => {
    const [themeId, setTheme] = React.useState<'dark' | 'light'>(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    const [t, sT] = React.useState(theme[themeId])
    React.useEffect(() => {
        sT({...theme[themeId]})
    }, [sT, themeId])
    React.useEffect(() => {
        const evt = (e: MediaQueryListEvent) => {
            setTheme(e.matches ? 'dark' : 'light')
        }
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', evt)
        return () => window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', evt)
    }, [setTheme])
    const api = process.env.REACT_APP_ICON1_API as string

    return <>
        <ThemeProvider theme={t}>
            <StyledEngineProvider injectFirst/>
            <CssBaseline/>
            {api ?
                <Icon1Provider api={api}>
                    <Layout/>
                </Icon1Provider> :
                <Typography>Missing Icon1 Api endpoint config.</Typography>}
        </ThemeProvider>
    </>
}
