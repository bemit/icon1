import { IconProvider } from '../IconProvider'
import { Icon1Icon, Icon1IconDetails } from '@icon1/core/Icon1Types'
import { SimpleIcon } from 'simple-icons'
import { fileImport } from '../../lib/fileImport.js'

export const IconProviderSimpleIcons: IconProvider = {
    id: 'simple-icons',
    list: async(dataDir): Promise<Icon1IconDetails[]> => {
        return await fileImport(dataDir + '/simple-icons.js').then(r => r.default)
    },
    icon: async(_dataDir, icon, variant): Promise<Icon1Icon> => {
        if(variant) {
            throw new Error('variants-not-supported-by-provider')
        }
        let data: SimpleIcon
        try {
            data = await import('simple-icons/icons/' + icon).then(r => r.default) as SimpleIcon
        } catch(e) {
            if('code' in e && e.code === 'ERR_MODULE_NOT_FOUND') {
                throw new Error('icon-not-found')
            }
            throw e
        }
        return {
            title: data.title,
            data: data.svg,
        }
    },
}
