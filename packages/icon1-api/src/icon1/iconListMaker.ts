import fs from 'fs'
import siSimpleicons, { SimpleIcon } from 'simple-icons'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { Icon1IconDetails, Icon1ListBuilt } from '@icon1/core/Icon1Types'

const __dirname = dirname(fileURLToPath(import.meta.url))

const iconListMakerSimpleIcons = (): Icon1ListBuilt => {
    const idIndex: Icon1ListBuilt['idIndex'] = {}
    const icons = Object.values(siSimpleicons).map((i, j) => {
        i = i as SimpleIcon
        idIndex[i.slug] = j
        return {
            title: i.title,
            id: i.slug,
            source: i.source,
            colorDefault: i.hex ? '#' + i.hex : undefined,
        }
    })
    return {
        list: icons,
        idIndex: idIndex,
    }
}

const iconListMakerMaterial = async(): Promise<Icon1ListBuilt> => {
    const idIndex: Icon1ListBuilt['idIndex'] = {}
    const defaultVariant = 'filled'
    const variantIds = ['filled', 'outlined', 'round', 'sharp', 'two-tone']
    let modulePath = __dirname + '/../../node_modules/@material-design-icons/svg'
    if(!fs.existsSync(modulePath)) {
        modulePath = __dirname + '/../../../../node_modules/@material-design-icons/svg'
        if(!fs.existsSync(modulePath)) {
            throw new Error('can not find module path of @material-design-icons/svg')
        }
    }
    const muiIconsParsed: { [id: string]: Icon1IconDetails } = {}
    const reader: Promise<undefined>[] = []
    variantIds.forEach(v => {
        reader.push(new Promise((resolve) => {
            fs.readdir(modulePath + '/' + v, (err, files) => {
                if(err) {
                    console.log(err)
                    return
                }
                files.forEach(file => {
                    file = file.replace('.svg', '')
                    const id = file
                    if(!muiIconsParsed[id]) {
                        muiIconsParsed[id] = {
                            id: id,
                            title: id.split('_').map(s => s.slice(0, 1).toUpperCase() + s.slice(1)).join(' '),
                            variants: [],
                        }
                    }
                    if(v !== defaultVariant) {
                        // @ts-ignore
                        muiIconsParsed[id].variants.push(v)
                    }
                })
                resolve(undefined)
            })
        }))
    })
    await Promise.all(reader)
    const icons = Object.values(muiIconsParsed).map((i, j) => {
        idIndex[i.id] = j
        return i
    }) as Icon1IconDetails[]
    return {
        list: icons,
        idIndex: idIndex,
        variants: variantIds,
    }
}

export const iconListMaker = (targetDir: string): void => {
    const writer = []
    if(!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir)
    }
    writer.push(new Promise((resolve, reject) => {
        const simpleIconsList = iconListMakerSimpleIcons()
        fs.writeFile(targetDir + '/simple-icons.js', 'export default ' + JSON.stringify(simpleIconsList), {}, (e) => {
            if(e) {
                reject(e)
            } else {
                resolve(true)
            }
        })
    }))
    writer.push((async() => {
        const muiIconsList = await iconListMakerMaterial()
        return await new Promise((resolve, reject) => {
            fs.writeFile(targetDir + '/material-ui.js', 'export default ' + JSON.stringify(muiIconsList), {}, (e) => {
                if(e) {
                    reject(e)
                } else {
                    resolve(true)
                }
            })
        })
    })())
    Promise.all(writer)
        .then((r) => {
            const success = r.reduce((s: number, r1) => s + (r1 ? 1 : 0), 0)
            console.log('run ' + r.length + ' icon lists makers, successfully: ' + success)
        })
        .catch((e) => {
            console.error('error while writing icon list', e)
        })
}
