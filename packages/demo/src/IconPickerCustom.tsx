import React from 'react'
import Box from '@mui/material/Box'
import { SliderPicker } from 'react-color'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import MuiLink from '@mui/material/Link'
import Collapse from '@mui/material/Collapse'
import IcSearch from '@mui/icons-material/Search'
import IcClear from '@mui/icons-material/Clear'
import FormHelperText from '@mui/material/FormHelperText'
import { Icon1Picker, Icon1PickerProps } from '@icon1/mui/Icon1Picker'
import { useIcon1 } from '@icon1/react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import { useUID } from 'react-uid'

export const IconPickerCustom: React.ComponentType<{
    selected?: string
    onSelect: Icon1PickerProps['onSelect']
    color?: string
    setColor: (color: string) => void
    validColor?: boolean
}> = (
    {
        selected,
        onSelect,
        color,
        setColor,
        validColor,
    },
) => {
    const uid = useUID()
    const {variants} = useIcon1()
    const params = new URLSearchParams(window.location.search)
    const [provider, setProvider] = React.useState<'simple-icons' | 'material-ui'>(params.get('provider') === 'material-ui' ? 'material-ui' : 'simple-icons')
    const [variant, setVariant] = React.useState<string | undefined>(params.get('variant') || undefined)
    const [openSearch, setOpenSearch] = React.useState<boolean>(false)

    const [activeSearch, setActiveSearch] = React.useState(params.get('search') || '')
    const [iconSearch, setIconSearch] = React.useState<{
        provider: string
        search: string
    } | undefined>()
    const providerVariants = variants ? variants[provider] : undefined

    const iconSearchSearch = iconSearch?.search
    React.useEffect(() => {
        const timer = window.setTimeout(() => {
            setActiveSearch(iconSearchSearch || '')
        }, 80)
        return () => window.clearTimeout(timer)
    }, [iconSearchSearch, setActiveSearch])

    return <Box mb={2} style={{display: 'flex', flexDirection: 'column'}}>
        <Box style={{display: 'flex'}}>
            <Select
                size={'small'}
                value={provider}
                onChange={(e) => {
                    setProvider(e.target.value as 'simple-icons' | 'material-ui')
                    const params2 = new URLSearchParams()
                    params2.set('provider', e.target.value)
                    // params2.delete('icon')
                    // params2.delete('color')
                    // params2.delete('variant')
                    window.history.replaceState({}, '', window.location.pathname + '?' + params2.toString())
                    setVariant(undefined)
                }}
                style={{flexGrow: 1}}
            >
                <MenuItem value={'simple-icons'}>Brand Icons</MenuItem>
                <MenuItem value={'material-ui'}>Material UI</MenuItem>
            </Select>
            <Button
                onClick={() => setOpenSearch(o => !o)}
                style={{minWidth: 36, padding: '2px 8px'}}
                size={'small'}
                title={openSearch ? 'Close Search' : 'Open Search'}
            ><IcSearch/></Button>
        </Box>

        <Typography style={{width: '100%'}} variant={'caption'}>
            {'icons by '}
            {provider === 'simple-icons' ? <MuiLink
                href={'https://simpleicons.org'}
                color={'inherit'}
                target={'_blank'} rel={'noopener noreferrer'}
            >simpleicons.org</MuiLink> : null}
            {provider === 'material-ui' ? <MuiLink
                href={'https://material.io/icons'}
                color={'inherit'}
                target={'_blank'} rel={'noopener noreferrer'}
            >material.io</MuiLink> : null}
        </Typography>

        <Collapse in={openSearch} timeout={250} mountOnEnter unmountOnExit>
            <Box mt={1}>
                <TextField
                    size={'small'}
                    autoFocus={openSearch}
                    fullWidth
                    placeholder={'Search'}
                    value={iconSearch?.search || ''}
                    onFocus={() => setIconSearch(is => ({
                        provider: provider,
                        search: is?.provider === provider ? is.search : '',
                    }))}
                    onChange={e => setIconSearch({
                        provider: provider,
                        search: e.target.value,
                    })}
                />
            </Box>

            {providerVariants ?
                <Box mt={2}>
                    <FormControl fullWidth size={'small'}>
                        <InputLabel id={'ic1-' + uid + '-lbl'}>Variant</InputLabel>
                        <Select
                            id={'ic1-' + uid}
                            labelId={'ic1-' + uid + '-lbl'}
                            size={'small'}
                            label={'Variant'}
                            value={variant || ''}
                            // style={{marginTop: 8}}
                            onChange={(e) => {
                                setVariant((e.target.value as string) || undefined)
                                params.set('variant', e.target.value)
                                window.history.replaceState({}, '', window.location.pathname + '?' + params.toString())
                            }}
                            fullWidth
                        >
                            {providerVariants.map((v, i) =>
                                <MenuItem key={v} value={i === 0 ? '' : v}>{i === 0 ? 'default' : v}</MenuItem>,
                            )}
                        </Select>
                    </FormControl>
                </Box> : null}
        </Collapse>

        <Box mb={1}>
            <Icon1Picker
                width={240}
                provider={provider}
                variant={variant}
                selected={selected}
                onSelect={onSelect}
                search={activeSearch}
                fulltextSearch
            />
        </Box>

        <Box mb={1} style={{display: 'flex'}}>
            <TextField
                size={'small'}
                value={color || ''}
                placeholder={'Color'}
                error={Boolean(color && color.indexOf('#') === 0 && (color.length < 4 || color.length > 7))}
                onChange={(e) => setColor(e.target.value)}
                style={{flexGrow: 1, flexShrink: 1}}
            />
            {color ?
                <Button
                    onClick={() => setColor('')}
                    style={{minWidth: 36, padding: '2px 8px'}}
                    size={'small'}
                    title={'Clear Color'}
                ><IcClear/></Button> : null}
        </Box>
        {color && !validColor ?
            <FormHelperText error>Invalid color code</FormHelperText> : null}
        <Box>
            <SliderPicker
                color={color}
                onChange={e => {
                    setColor(color === '#000000' && e.hex === '#000000' ? '#a079d2' : e.hex)
                }}
            />
        </Box>
    </Box>
}
