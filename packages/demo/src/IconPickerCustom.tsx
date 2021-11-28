import React from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import MuiLink from '@material-ui/core/Link'
import Collapse from '@material-ui/core/Collapse'
import IcSearch from '@material-ui/icons/Search'
import IcClear from '@material-ui/icons/Clear'
import { Icon1Picker, Icon1PickerProps } from '@icon1/mui/Icon1Picker'
import { useIcon1 } from '@icon1/react'

export const IconPickerCustom: React.ComponentType<{
    selected?: string
    onSelect: Icon1PickerProps['onSelect']
    color?: string
    setColor: (color: string) => void
}> = (
    {
        selected,
        onSelect,
        color,
        setColor,
    },
) => {
    const {variants} = useIcon1()
    const [provider, setProvider] = React.useState<'simple-icons' | 'material-ui'>('simple-icons')
    const [variant, setVariant] = React.useState<string | undefined>(undefined)
    const [openSearch, setOpenSearch] = React.useState<boolean>(false)

    const [activeSearch, setActiveSearch] = React.useState('')
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
                value={provider}
                onChange={(e) => setProvider(e.target.value as 'simple-icons' | 'material-ui')}
                fullWidth
            >
                <MenuItem value={'simple-icons'}>Brand Icons</MenuItem>
                <MenuItem value={'material-ui'}>Material UI</MenuItem>
            </Select>
            {providerVariants ? <Select
                value={variant || ''}
                style={{marginLeft: 4}}
                onChange={(e) => setVariant((e.target.value as string) || undefined)}
                fullWidth
            >
                {providerVariants.map((v, i) =>
                    <MenuItem key={v} value={i === 0 ? '' : v}>{i === 0 ? 'default' : v}</MenuItem>,
                )}
            </Select> : null}
            <Button
                onClick={() => setOpenSearch(o => !o)}
                style={{minWidth: 30, padding: 2}}
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

        <Collapse in={openSearch} timeout={250}>
            <TextField
                size={'small'}
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
        </Collapse>

        <Box>
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

        <Box mt={1} style={{display: 'flex'}}>
            <TextField
                size={'small'}
                value={color || ''}
                placeholder={'Color'}
                error={Boolean(color && color.indexOf('#') === 0 && (color.length < 4 || color.length > 7))}
                fullWidth
                onChange={(e) => setColor(e.target.value)}
            />
            {color ? <Button
                onClick={() => setColor('')}
                style={{minWidth: 30, padding: 2}}
                size={'small'}
                title={'Clear Color'}
            ><IcClear/></Button> : null}
        </Box>
    </Box>
}
