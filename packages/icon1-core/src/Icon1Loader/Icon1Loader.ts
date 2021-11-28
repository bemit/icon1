import { Icon1Icon, Icon1IconDetails } from '@icon1/core/Icon1Types'

export const Icon1Loader = {
    loadIcon: (api: string, provider: string, icon: string, variant?: string): Promise<Icon1Icon> => {
        return fetch(
            api + '/icon/' + provider + '/' + icon + (variant ? '?variant=' + encodeURIComponent(variant) : ''), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(async(r) => {
                try {
                    return {
                        status: r.status,
                        data: await r.json(),
                    }
                } catch(e) {
                    console.log(e)
                    return Promise.reject({
                        status: r.status,
                        data: e,
                    })
                }
            })
            .then(data => {
                if(data.data.icon) {
                    return data.data.icon
                }
                return Promise.reject('icon1 api error: no result for loadIcon')
            })
    },
    loadIconsList: (api: string, provider: string): Promise<{
        icons: Icon1IconDetails[]
        variants?: string[]
    }> => {
        return fetch(
            api + '/icons/' + encodeURIComponent(provider), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(async(r) => {
                try {
                    return {
                        status: r.status,
                        data: await r.json(),
                    }
                } catch(e) {
                    console.log(e)
                    return Promise.reject({
                        status: r.status,
                        data: e,
                    })
                }
            })
            .then(data => {
                if(data.data.icons) {
                    return {
                        icons: data.data.icons,
                        variants: data.data.variants,
                    }
                }
                return Promise.reject('icon1 api error: no result for loadIconsList')
            })
    },
}
