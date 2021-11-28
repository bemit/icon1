import createMuiTheme, { Theme } from '@material-ui/core/styles/createTheme'
import { getContrastRatio } from '@material-ui/core'

const universal = {
    palette: {
        contrastThreshold: 2,
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 435,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    typography: {
        fontSize: 14,
        h1: {
            fontSize: '2.7rem',
        },
        h2: {
            fontSize: '2.3rem',
        },
        h3: {
            fontSize: '1.75rem',
        },
        h4: {
            fontSize: '1.6rem',
        },
        h5: {
            fontSize: '1.45rem',
        },
        h6: {
            fontSize: '1.125rem',
        },
        body1: {
            letterSpacing: '0.0185em',
        },
        body2: {
            letterSpacing: '0.01em',
        },
    },
    shape: {
        borderRadius: 0,
    },
}

export const customTheme = (primary: string): {
    dark: Theme
    light: Theme
} => {
    const getContrastText = (background: string) => {
        const contrastText =
            getContrastRatio(background, '#c6c4c4') >= 2 ?
                getContrastRatio(background, '#c6c4c4') <= 3 ?
                    '#ffffff' : '#c6c4c4' :
                getContrastRatio(background, '#001f29') <= 3 ?
                    '#000000' : '#001f29'

        if(process.env.NODE_ENV !== 'production') {
            const contrast = getContrastRatio(background, contrastText)
            if(contrast < 3) {
                console.error(
                    [
                        `MUI: The contrast ratio of ${contrast}:1 for ${contrastText} on ${background}`,
                        'falls below the WCAG recommended absolute minimum contrast ratio of 3:1.',
                        'https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast',
                    ].join('\n'),
                )
            }
        }

        return contrastText
    }
    const themeDark = createMuiTheme({
        ...universal,
        palette: {
            ...universal.palette,
            type: 'dark',
            primary: {
                //light: '#43c0d5',
                main: primary,
                //dark: '#033944',
            },
            secondary: {
                light: '#adf3e8',
                main: '#4ee3d7',
                dark: '#266e62',
            },
            background: {
                paper: '#13181c',
                default: '#010203',
            },
            text: {
                primary: '#c6c4c4',
                secondary: '#acc9c5',
            },
            info: {
                main: '#1872b9',
            },
            error: {
                main: '#9d190f',
                //main: '#b71c10',
            },
            warning: {
                main: '#d54600',
            },
            action: {
                hoverOpacity: 0.2,
            },
            getContrastText: getContrastText,
        },
        overrides: {
            MuiInputLabel: {
                root: {
                    //variant: '#6431f7',
                    '&$focused': {
                        color: '#7649f6',
                    },
                    '&$error': {
                        color: '#b71c10',
                    },
                },
            },
        },
    })

    const themeLight = createMuiTheme({
        ...universal,
        palette: {
            ...universal.palette,
            type: 'light',
            primary: {
                main: primary,
                //dark: '#033944',
            },
            secondary: {
                light: '#adf3e8',
                main: '#4cecd6',
                dark: '#266e62',
            },
            background: {
                //paper: '#e8e8e8',
                paper: '#f7f7f7',
                //default: '#d2d2d2',
                //default: '#e3e3e3',
                default: '#ececec',
            },
            text: {
                primary: '#001f29',
                secondary: '#001820',
            },
            warning: {
                dark: '#cc4c00',
                main: '#f05a00',
            },
            info: {
                main: '#3593dd',
            },
            action: {
                hoverOpacity: 0.2,
            },
            getContrastText: getContrastText,
        },
    })

    return {
        dark: themeDark,
        light: themeLight,
    }
}
