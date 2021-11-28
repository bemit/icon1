import React from 'react'
import { Icon1Loader } from '@icon1/core/Icon1Loader'
import { Icon1ContextActions, Icon1ContextLoader } from '@icon1/react/Icon1Provider'

const loaderCheckLists: { [p: string]: boolean } = {}
const loaderCheckIcon: {
    [provider: string]: {
        [id: string]: {
            [variant: string]: boolean
        }
    }
} = {}

export const useIcon1Loader = (): Icon1ContextActions => {
    const {api, setIcons} = React.useContext(Icon1ContextLoader)

    const loadIcon: Icon1ContextActions['loadIcon'] = React.useCallback((provider, icon, variant) => {
        const variantOrDefault = variant || 'default'
        if(loaderCheckIcon[provider] && loaderCheckIcon[provider][icon] && loaderCheckIcon[provider][icon][variantOrDefault]) {
            return Promise.resolve(true)
        }

        if(!loaderCheckIcon[provider]) loaderCheckIcon[provider] = {}
        if(!loaderCheckIcon[provider][icon]) loaderCheckIcon[provider][icon] = {}
        loaderCheckIcon[provider][icon][variantOrDefault] = true

        return Icon1Loader.loadIcon(api, provider, icon, variant)
            .then(iconData => {
                setIcons((si) => {
                    return {
                        ...si,
                        iconDetails: {
                            ...si.iconDetails,
                            [provider]: {
                                ...(si.iconDetails[provider] || {}),
                                [icon]: {
                                    ...(si.iconDetails[provider] ? si.iconDetails[provider][icon] || {} : {}),
                                    [variantOrDefault]: iconData,
                                },
                            },
                        },
                    }
                })
                return true
            })
            .catch(e => {
                delete loaderCheckIcon[provider][icon][variantOrDefault]
                return Promise.reject(e)
            })
    }, [setIcons, api])

    const listIcons: Icon1ContextActions['listIcons'] = React.useCallback((provider) => {
        if(loaderCheckLists[provider]) {
            return Promise.resolve(true)
        }

        loaderCheckLists[provider] = true

        return Icon1Loader.loadIconsList(api, provider)
            .then(r => {
                setIcons((si) => {
                    return {
                        ...si,
                        icons: {
                            ...si.icons,
                            [provider]: r.icons,
                        },
                        ...(r.variants ? {
                            variants: {
                                ...si.variants,
                                [provider]: r.variants,
                            },
                        } : {}),
                    }
                })
                return true
            })
            .catch(e => {
                delete loaderCheckLists[provider]
                return Promise.reject(e)
            })
    }, [setIcons, api])

    return {
        api,
        listIcons,
        loadIcon,
    }
}
