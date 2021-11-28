import { Icon1Icon } from '@icon1/core/Icon1Types'
import React from 'react'
import { useIcon1Loader } from '@icon1/react/useIcon1Loader/useIcon1Loader'
import { useIcon1 } from '@icon1/react/Icon1Provider'

export interface WithIconProps {
    iconRef: {
        provider: string
        icon: string
        variant?: string
    }
}

export interface WithIconPropsTarget {
    icon: Icon1Icon | undefined
}

export const withIcon = <P extends WithIconPropsTarget>(Component: React.ComponentType<P>): React.ComponentType<Omit<P, keyof WithIconPropsTarget> & WithIconProps> => {
    const WithIcon = (p: Omit<P, keyof WithIconPropsTarget> & WithIconProps) => {
        const {iconDetails} = useIcon1()
        const {loadIcon} = useIcon1Loader()
        const iconId = p.iconRef.icon
        const iconVariant = p.iconRef.variant
        const iconProvider = p.iconRef.provider

        React.useEffect(() => {
            loadIcon(iconProvider, iconId, iconVariant)
                .catch(e => console.log(e))
        }, [loadIcon, iconProvider, iconId, iconVariant])

        const icon = iconDetails[iconProvider] && iconDetails[iconProvider][iconId] && iconDetails[iconProvider][iconId][iconVariant || 'default'] ?
            iconDetails[iconProvider][iconId][iconVariant || 'default'] : undefined

        // @ts-ignore
        return <Component
            {...p}
            icon={icon}
        />
    }
    WithIcon.displayName = `WithIcon(${Component.displayName || Component.name || 'Anonymous'})`
    return WithIcon
}
