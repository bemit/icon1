import { IconProvider } from '../IconProvider'
import { Icon1Icon, Icon1ListBuilt } from '@icon1/core/Icon1Types'
import { fileImport } from '../../lib/fileImport.js'
import fs from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const IconProviderMaterialUI: IconProvider = {
    id: 'material-ui',
    list: async(dataDir): Promise<Icon1ListBuilt> => {
        return await fileImport(dataDir + '/material-ui.js').then(r => r.default)
    },
    icon: async(_dataDir, icon, variant): Promise<Icon1Icon> => {
        const defaultVariant = 'filled'
        if(!variant) {
            variant = defaultVariant
        }
        const variantIds = ['filled', 'outlined', 'round', 'sharp', 'two-tone']
        if(!variantIds.includes(variant)) {
            throw new Error('variant-not-found')
        }
        // path in e.g. google-functions
        let modulePath = __dirname + '/../../node_modules/@material-design-icons/svg'
        if(!fs.existsSync(modulePath)) {
            // path e.g. locally when not hoisting deps
            modulePath = __dirname + '/../../../node_modules/@material-design-icons/svg'
            if(!fs.existsSync(modulePath)) {
                // path e.g. locally when hoisting deps
                modulePath = __dirname + '/../../../../../node_modules/@material-design-icons/svg'
                if(!fs.existsSync(modulePath)) {
                    throw new Error('can not find module path of @material-design-icons/svg')
                }
            }
        }
        if(!fs.existsSync(modulePath + '/' + variant + '/' + icon + '.svg')) {
            throw new Error('icon-not-found')
        }
        let data: string = await new Promise((resolve, reject) => {
            fs.readFile(modulePath + '/' + variant + '/' + icon + '.svg', (e, d) => {
                if(e) {
                    reject(e)
                    return
                }
                resolve(d.toString())
            })
        })
        // removing `height`/`width` attributes to get back a full responsive icon
        data = data.replace('height="24" ', '').replace('width="24" ', '')
        return {
            data: data,
        }
    },
}
