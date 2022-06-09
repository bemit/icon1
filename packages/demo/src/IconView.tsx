import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import Paper from '@mui/material/Paper'
import IcDetails from '@mui/icons-material/InfoRounded'
import { Icon1Embed, useIcon1, useIcon1Loader } from '@icon1/react'
import { IconPickerCustom } from './IconPickerCustom'

export const IconView: React.ComponentType<{}> = () => {
    const {api} = useIcon1Loader()
    const params = new URLSearchParams(window.location.search)
    const [color, setColor] = React.useState<string | undefined>(params.get('color') ? '#' + params.get('color') : undefined)
    const [openDetails, setOpenDetails] = React.useState<boolean>(false)
    const initialParams = React.useMemo(() => new URLSearchParams(window.location.search) || undefined, [])
    const {iconDetails} = useIcon1()
    const [variant, setVariant] = React.useState<string | undefined>(initialParams.get('variant') || undefined)
    const [selected, setSelected] = React.useState<{
        id?: string
        provider?: string
        variant?: string
    }>({
        id: initialParams.get('icon') || undefined,
        provider: initialParams.get('provider') || undefined,
        variant: initialParams.get('variant') || undefined,
    })

    const validColor = Boolean(color && color.indexOf('#') === 0 && color.length >= 4 && color.length <= 7 && color.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)?.length)

    const onColor: (color: string) => void = (color) => {
        const params = new URLSearchParams(window.location.search)
        if(color) {
            params.set('color', color.slice(1))
        } else {
            params.delete('color')
        }
        window.history.replaceState({}, '', window.location.pathname + '?' + params.toString())
        setColor(color)
    }
    const details = iconDetails?.[selected.provider as string]?.[selected.id as string]?.[variant || 'default']

    return <Box style={{
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
        flexWrap: 'wrap',
    }}>
        <Box style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
            flexWrap: 'wrap',
            marginTop: 'auto',
        }}>
            <Box m={2}>
                <IconPickerCustom
                    selected={selected?.id}
                    setColor={onColor}
                    color={color}
                    validColor={validColor}
                    variant={variant}
                    setVariant={setVariant}
                    onSelect={(provider, iconDetails, variant) => {
                        setSelected(s => s?.id === iconDetails.id && s?.variant === variant ? {} : {
                            provider: provider,
                            variant: variant,
                            id: iconDetails.id,
                        })
                        onColor(iconDetails.colorDefault || color || '')

                        const params = new URLSearchParams(window.location.search)
                        params.set('icon', iconDetails.id)
                        params.set('provider', provider)
                        if(iconDetails.colorDefault) {
                            params.set('color', iconDetails.colorDefault.slice(1))
                        }
                        window.history.replaceState({}, '', window.location.pathname + '?' + params.toString())
                    }}
                />
            </Box>
            <Box
                m={2}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10rem',
                    width: 240,
                }}
            >
                {selected?.id && selected.provider ?
                    <Box>
                        <Icon1Embed
                            provider={selected.provider}
                            id={selected.id}
                            variant={variant}
                            fontSize={'inherit'}
                            color={validColor ? color : undefined}
                        />
                        <Typography align={'center'} variant={'body1'} color={'textPrimary'}>{details?.title as unknown as string || selected.id || '-'}</Typography>
                    </Box> :
                    <Typography style={{opacity: 0.65}} color={'textPrimary'}>Select an icon.</Typography>}
            </Box>
        </Box>
        <Typography
            style={{opacity: 0.65, width: '100%'}}
            variant={'caption'} color={'textPrimary'}
            align={'center'}
        >
            {selected?.id ?
                <textarea
                    value={
                        api + '/icon/' +
                        selected.provider + '/' +
                        selected.id + '.svg' +
                        (variant || color ? '?' : '') +
                        (variant ? 'variant=' + variant : '') +
                        (variant && color ? '&' : '') +
                        (color ? 'color=' + color.slice(1) : '')
                    }
                    rows={1} readOnly
                    style={{
                        width: '100%',
                        display: 'flex',
                        border: 0,
                        background: 'transparent',
                        textAlign: 'center',
                        color: 'inherit',
                        height: 'calc(1.865em + 6px)',
                        padding: 6,
                        margin: 0,
                        lineHeight: '1.35em',
                    }}
                /> :
                <code style={{visibility: 'hidden'}}>-</code>}
        </Typography>

        <Box style={{
            textAlign: 'center', width: '100%', marginBottom: 'auto',
            visibility: selected?.id ? undefined : 'hidden',
        }}>
            <IconButton
                onClick={() => setOpenDetails(o => !o)}
                size={'small'}
            ><IcDetails/></IconButton>
        </Box>

        <Collapse
            in={Boolean(openDetails && selected?.id)} timeout={275}
            style={{margin: '0 auto', overflow: 'auto'}}
        >
            <Box mx={1}>
                <Paper
                    style={{
                        padding: '12px',
                        minHeight: 100,
                        overflow: 'auto',
                    }}
                >
                    <Typography
                        style={{width: '100%', margin: '0 auto'}}
                        variant={'caption'}
                        align={'left'}
                    >
                        {details ? <pre style={{margin: 0}}><code>{JSON.stringify(details, undefined, 4)}</code></pre> : null}
                    </Typography>
                </Paper>
            </Box>
        </Collapse>
    </Box>
}
