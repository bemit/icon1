import { ExpressHandler, HandlerError } from '../lib/routing.js'
import { ServiceService } from '../service/ServiceService.js'
import { IconService } from '../service/IconService.js'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const handleListIcons = async(iconService: IconService, id: string) => {
    if(!iconService.isProvider(id)) {
        throw new HandlerError(404, 'provider-not-found')
    }

    return await iconService.list(id)
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const handleListProvider = async(iconService: IconService) => {
    return iconService.getProviderIds()
}

const IconsListHandler: ExpressHandler = async(req, res) => {
    if(req.params.provider) {
        const providerList = await handleListIcons(await ServiceService.get('IconService'), req.params.provider)
        res.setHeader('Cache-Control', 'public, max-age=259200, immutable')
        return res.json({
            icons: providerList.icons,
            variants: providerList.variants,
        })
    } else {
        const provider = await handleListProvider(await ServiceService.get('IconService'))
        res.setHeader('Cache-Control', 'public, max-age=259200, immutable')
        return res.json({
            provider: provider,
        })
    }
}

export default IconsListHandler
