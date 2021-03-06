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
    // caching 2 days
    res.setHeader('Cache-Control', 'public, max-age=1209600, immutable')
    const color = req.query?.['color'] as string
    if(color) {
        if(color.length !== 6 || !color.match(/^([0-9a-f]{3}|[0-9a-f]{6})$/i)) {
            return res.status(400).json({
                error: 'color-not-valid-6-hex',
                code: 400,
            })
        }
        icon.data = icon.data.replace(/<svg /, '<svg style="color: #' + color + '; fill: currentColor;" ')
    }
    if(!asSvg) {
        return res.json({
            icon: icon,
        })
    }
    return res.setHeader('Content-Type', 'image/svg+xml').send(icon.data)
}

export default IconViewHandler
