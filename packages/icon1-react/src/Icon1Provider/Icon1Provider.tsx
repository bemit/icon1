import React from 'react'
import { Icon1Icon, Icon1IconDetails } from '@icon1/core/Icon1Types'

export interface Icon1ContextType {
    iconDetails: {
        [provider: string]: {
            [id: string]: {
                [variant: string]: Icon1Icon
            }
        }
    }
    icons: {
        [provider: string]: Icon1IconDetails[]
    }
    variants: {
        [provider: string]: string[]
    }
}

export interface Icon1ContextActions {
    api: string
    listIcons: (provider: string) => Promise<boolean>
    loadIcon: (provider: string, icon: string, variant?: string) => Promise<boolean>
}

const Icon1ContextDefault: Icon1ContextType = {
    icons: {},
    variants: {},
    iconDetails: {},
}

export interface Icon1ContextLoaderType {
    api: string
    setIcons: React.Dispatch<React.SetStateAction<Icon1ContextType>>
}

export const Icon1ContextState = React.createContext<Icon1ContextType>(Icon1ContextDefault)
// @ts-ignore
export const Icon1ContextLoader = React.createContext<Icon1ContextLoaderType>()

export const useIcon1 = (): Icon1ContextType => React.useContext(Icon1ContextState)

export interface Icon1ProviderProps {
    // url to the icon1 api
    api: string
}

export const Icon1Provider = (
    {
        children, api,
    }: React.PropsWithChildren<Icon1ProviderProps>,
): React.ReactElement => {
    const [icons, setIcons] = React.useState<Icon1ContextType>({
        icons: {},
        variants: {},
        iconDetails: {},
    })

    const ctxLoader = React.useMemo(() => ({
        setIcons,
        api,
    }), [
        setIcons,
        api,
    ])

    return <Icon1ContextState.Provider value={icons}>
        <Icon1ContextLoader.Provider value={ctxLoader}>
            {children}
        </Icon1ContextLoader.Provider>
    </Icon1ContextState.Provider>
}
