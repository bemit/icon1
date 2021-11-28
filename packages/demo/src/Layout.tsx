import React from 'react'
import { Logo } from './Logo'
import { IconView } from './IconView'

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
            <h1 style={{fontWeight: 600, fontSize: '1.125rem', marginBottom: 8, display: 'flex'}}>
                <Logo/>
                Icon1
            </h1>
            <p style={{
                fontWeight: 300, fontSize: '0.85rem',
                margin: 'auto 0 auto auto',
                display: 'flex',
            }}>
                <a
                    href={'https://github.com/bemit/icon1'}
                    style={{
                        fontWeight: 300,
                        fontSize: '0.85rem',
                        marginTop: 0,
                        marginLeft: 4,
                    }}
                >GitHub</a>
            </p>
        </div>

        <IconView/>

        <div style={{margin: 'auto auto 8px auto'}}>
            <p>by <a href={'https://mlbr.xyz'}>Michael Becker</a></p>
        </div>
    </div>
}
