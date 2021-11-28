import { ServiceService } from './service/ServiceService.js'
import { IconProviderSimpleIcons } from './icon1/provider/IconProviderSimpleIcons.js'
import { IconProviderMaterialUI } from './icon1/provider/IconProviderMaterialUI.js'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const services = (): void => {
    ServiceService.add('IconService', () => ({
        loader: import('./service/IconService.js'),
        init: [{
            dataDir: __dirname + '/data',
            providers: [
                IconProviderSimpleIcons,
                IconProviderMaterialUI,
            ],
        }],
    }))
}
