import React, { memo } from 'react'
import { Icon1Icon } from '@icon1/core/Icon1Types'

export interface IconEmbedBaseProps {
    icon: Icon1Icon | undefined
    title?: string
    color?: string
    fontSize?: string
    display?: React.CSSProperties['display']
}

export const IconEmbedBase: React.ComponentType<IconEmbedBaseProps> = (
    {
        icon,
        title,
        fontSize = 'default',
        color = 'inherit',
        display = 'inline-block',
    },
) => {
    const fontSizeCss =
        fontSize === 'inherit' ?
            'inherit' :
            fontSize === 'small' ?
                '1.25rem' :
                fontSize === 'medium' || fontSize === 'default' ?
                    '1.5rem' :
                    fontSize === 'large' ?
                        '2.1875rem' : fontSize
    return <span style={{
        display: display,
        // todo: check where mui saves this size and reuse it
        fontSize: fontSizeCss,
    }}>
        {icon?.data ?
            <span
                /* @ts-ignore */
                dangerouslySetInnerHTML={{__html: icon.data}}
                title={title}
                style={{
                    width: '1em',
                    height: '1em',
                    display: 'flex',
                    color: color,
                    fill: 'currentColor',
                    padding: '0.125em',
                }}
            /> :
            // todo: make skeleton with fontSize `inherit` compatible
            fontSizeCss !== 'inherit' ?
                <div
                    style={{
                        width: fontSizeCss,
                        height: fontSizeCss,
                        background: '#666666',
                        opacity: 0.5,
                        transform: 'scale(0.9)',
                    }}
                /> : null}
    </span>
}
export const IconEmbedBaseMemo = memo(IconEmbedBase)

