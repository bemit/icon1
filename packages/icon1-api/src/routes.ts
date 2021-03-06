import { DELETE, dynamicLoader, ExpressHandler, GET, POST, PUT } from './lib/routing.js'

const apiPrefix = ''

export const routes: [typeof GET | typeof POST | typeof PUT | typeof DELETE, string, ExpressHandler][] = [
    [GET, apiPrefix + '/', dynamicLoader(() => import ('./handler/HomeHandler.js').then(module => module.default))],
    [GET, apiPrefix + '/icons/:provider?', dynamicLoader(() => import ('./handler/IconsListHandler.js').then(module => module.default))],
    [GET, apiPrefix + '/icon/:provider/:icon', dynamicLoader(() => import ('./handler/IconViewHandler.js').then(module => module.default))],
]
