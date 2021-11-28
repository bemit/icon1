import { Icon1Icon, Icon1ListBuilt } from '@icon1/core/Icon1Types'

export interface IconProvider {
    id: string
    list: (dataDir: string) => Promise<Icon1ListBuilt>
    icon: (dataDir: string, id: string, variant?: string) => Promise<Icon1Icon>
}
