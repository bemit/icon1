import React from 'react'
import { IconEmbedBaseMemo, IconEmbedBaseProps } from '@icon1/react/IconEmbed'
import { withIcon } from '@icon1/react/withIcon/withIcon'

const LoaderIconBase = withIcon(IconEmbedBaseMemo)

export interface Icon1EmbedLoaderProps {
    provider: string
    id: string
    title?: string
    variant?: string
    fontSize?: string
    color?: string
    IconEmbed: React.ComponentType<IconEmbedBaseProps>
}

export const Icon1Embed: React.ComponentType<Omit<Icon1EmbedLoaderProps, 'IconEmbed'>> = (
    {
        id,
        provider,
        variant,
        color,
        title,
        fontSize,
    },
) => {
    return <LoaderIconBase
        fontSize={fontSize}
        title={title}
        color={color}
        iconRef={{
            icon: id,
            provider: provider,
            variant: variant,
        }}
    />
}
