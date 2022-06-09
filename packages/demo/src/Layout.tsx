import React from 'react'
import { Logo } from './Logo'
import { IconView } from './IconView'
import Typography from '@mui/material/Typography'

export const Layout: React.ComponentType<{}> = () => {
    const scrollWrapper = React.useRef<HTMLDivElement | null>(null)

    return <div
        ref={scrollWrapper}
        style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            width: '100vw',
            position: 'relative',
            color: '#ffffff',
            overflow: 'auto',
        }}
    >
        <div style={{padding: '9px 12px', display: 'flex'}}>
            <Typography
                variant={'body1'} component={'h1'} color={'textPrimary'}
                style={{fontWeight: 600, fontSize: '1.125rem', marginBottom: 8, display: 'flex'}}
            >
                <Logo/>
                <span style={{paddingLeft: 6}}>Icon1</span>
            </Typography>
            <Typography variant={'caption'} color={'textPrimary'} style={{margin: 'auto 4px'}}>open source icon picker</Typography>

            <Typography
                color={'textPrimary'}
                style={{
                    fontWeight: 300, fontSize: '0.85rem',
                    margin: 'auto 0 auto auto',
                    display: 'flex',
                }}
            >
                <a
                    href={'https://github.com/bemit/icon1'}
                    style={{
                        fontWeight: 300,
                        fontSize: '0.85rem',
                        marginTop: 0,
                        marginLeft: 4,
                        color: 'inherit',
                    }}
                >GitHub</a>
            </Typography>
        </div>

        <IconView/>

        <div style={{margin: 'auto auto 8px auto'}}>
            <Typography color={'textPrimary'} variant={'caption'} component={'p'}>by <a style={{color: 'inherirt'}} href={'https://i-am-digital.eu'}>Michael Becker</a></Typography>
        </div>
    </div>
}
