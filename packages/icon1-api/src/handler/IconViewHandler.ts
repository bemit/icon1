import { ExpressHandler, HandlerError } from '../lib/routing.js'
import { ServiceService } from '../service/ServiceService.js'
import { IconService } from '../service/IconService'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const handleGetIcon = async(iconService: IconService, provider: string, icon: string, variant: string | undefined) => {
    if(!iconService.isProvider(provider)) {
        throw new HandlerError(400, 'provider-not-found')
    }
    const iconData = await iconService.icon(provider, icon, variant)
    return iconData
}

const IconViewHandler: ExpressHandler = async(req, res) => {
    const {variant} = req.query
    let iconId = req.params.icon
    let asSvg = false
    if(iconId.endsWith('.svg')) {
        asSvg = true
        iconId = iconId.slice(0, iconId.length - 4)
    }
    let icon
    try {
        icon = await handleGetIcon(await ServiceService.get('IconService'), req.params.provider, iconId, variant as string | undefined)
    } catch(e) {
        if(e instanceof Error) {
            if(e.message === 'icon-not-found') {
                return res.status(404).json({
                    error: e.message,
                    code: 404,
                })
            }
            if(e.message === 'variants-not-supported-by-provider') {
                return res.status(400).json({
                    error: e.message,
                    code: 400,
                })
            }
            if(e.message === 'variant-not-found') {
                return res.status(400).json({
                    error: e.message,
                    code: 400,
                })
            }
        }
        throw e
    }
    res.setHeader('Cache-Control', 'public, max-age=604800, immutable')
    if(!asSvg) {
        return res.json({
            icon: icon,
        })
    }
    return res.setHeader('Content-Type', 'image/svg+xml').send(icon.data)
}

export default IconViewHandler
