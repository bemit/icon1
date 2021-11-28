import { IconProvider } from '../icon1/IconProvider'
import { Icon1Icon, Icon1IconDetails } from '@icon1/core/Icon1Types'

export class IconService {
    protected providers: IconProvider[]
    protected providerIds: string[]
    protected dataDir: string

    constructor({providers, dataDir}: {
        providers: IconProvider[]
        dataDir: string
    }) {
        this.providers = providers
        this.dataDir = dataDir
        this.providerIds = providers.map(p => p.id)
    }

    getProviderIds(): string[] {
        return this.providerIds
    }

    isProvider(provider: string): boolean {
        return this.providerIds.includes(provider)
    }

    getProvider(provider: string): IconProvider {
        return this.providers.find(p => p.id === provider) as IconProvider
    }

    async list(provider: string): Promise<{
        icons: Icon1IconDetails[]
        variants?: string
    }> {
        const providerList = await this.getProvider(provider).list(this.dataDir)
        return {
            icons: providerList.list,
            variants: providerList.variants,
        }
    }

    async icon(provider: string, icon: string, variant?: string): Promise<Icon1Icon & Icon1IconDetails> {
        const {list, idIndex} = await this.getProvider(provider).list(this.dataDir)
        const iconDetails = await this.getProvider(provider).icon(this.dataDir, icon, variant)
        return {...iconDetails, ...list[idIndex[icon]]}
    }
}
