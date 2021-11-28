import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'
import Paper from '@material-ui/core/Paper'
import IcDetails from '@material-ui/icons/InfoRounded'
import { Icon1Embed, useIcon1Loader } from '@icon1/react'
import { IconPickerCustom } from './IconPickerCustom'
import { Icon1IconDetails } from '@icon1/core'

export const IconView: React.ComponentType<{}> = () => {
    const {api} = useIcon1Loader()
    const [color, setColor] = React.useState<string | undefined>(undefined)
    const [openDetails, setOpenDetails] = React.useState<boolean>(false)
    const [selected, setSelected] = React.useState<{
        iconDetails: Icon1IconDetails
        provider: string
        variant?: string
    } | undefined>(undefined)

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
                    selected={selected?.iconDetails.id}
                    setColor={setColor}
                    color={color}
                    onSelect={(provider, iconDetails, variant) => {
                        setSelected(s => s?.iconDetails.id === iconDetails.id ? undefined : {
                            iconDetails: iconDetails,
                            provider: provider,
                            variant: variant,
                        })
                        setColor(iconDetails.colorDefault || '')
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
                {selected ? <Box>
                    <Icon1Embed
                        provider={selected.provider}
                        id={selected.iconDetails.id}
                        variant={selected.variant}
                        fontSize={'inherit'}
                        color={color && color.indexOf('#') === 0 && color.length >= 4 && color.length <= 7 ? color : undefined}
                    />
                    <Typography align={'center'}>{selected.iconDetails.title}</Typography>
                </Box> : <Typography style={{opacity: 0.65}}>Select an icon.</Typography>}
            </Box>
        </Box>
        <Typography
            style={{opacity: 0.65, width: '100%'}}
            variant={'caption'}
            align={'center'}
        >
            {selected ?
                <code>{api}/icon/{selected.provider}/{selected.iconDetails.id}.svg{selected.variant ? '?variant=' + selected.variant : ''}</code> :
                <code style={{visibility: 'hidden'}}>-</code>}
        </Typography>

        <Box style={{
            textAlign: 'center', width: '100%', marginBottom: 'auto',
            visibility: selected ? undefined : 'hidden',
        }}>
            <IconButton
                onClick={() => setOpenDetails(o => !o)}
                size={'small'}
            ><IcDetails/></IconButton>
        </Box>

        <Collapse
            in={Boolean(openDetails && selected)} timeout={275}
            style={{margin: '0 auto'}}
        >
            <Paper
                style={{padding: '12px', minHeight: 100}}
            >
                <Typography
                    style={{width: '100%', margin: '0 auto'}}
                    variant={'caption'}
                    align={'left'}
                >
                    <pre style={{margin: 0}}><code>{JSON.stringify(selected?.iconDetails, undefined, 4)}</code></pre>
                </Typography>
            </Paper>
        </Collapse>
    </Box>
}
