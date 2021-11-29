import express from 'express'
import cors, { CorsOptions, CorsOptionsDelegate } from 'cors'
import { corsConfig, routes } from './routes.js'
import {
    DELETE, GET, POST, PUT,
    ErrorHandlerMiddleware,
    handlerErrorWrapper,
} from './lib/routing.js'
import process from 'process'
import { getPerformanceInMs } from './lib/performance.js'
import { services } from './services.js'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

services()

const app = express()

app.use(cors({
    allowedHeaders: corsConfig.allowedHeaders,
    origin: function(origin: string, callback: (arg0: null, arg1: boolean) => void) {
        callback(
            null,
            Boolean(
                origin && (
                    corsConfig.allowedOrigins.includes(origin) ||
                    corsConfig.allowedOrigins.includes('*')
                )
            )
        )
    },
} as CorsOptions | CorsOptionsDelegate))

app.use(function profilerMiddleware(_req: express.Request, res: express.Response, next: () => void) {
    const startTime = process.hrtime()
    const send = res.send
    res.send = function(body) {
        const dur = getPerformanceInMs(process.hrtime(startTime))
        res.setHeader('X-Performance', dur)
        res.removeHeader('X-Powered-By')
        return send.call(this, body)
    }

    next()
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

routes.forEach(([method, path, handler]) => {
    const handle = handlerErrorWrapper(handler)
    method === GET && app.get(path, handle)
    method === PUT && app.put(path, handle)
    method === POST && app.post(path, handle)
    method === DELETE && app.delete(path, handle)
})

// caching `3h`
app.use('/', express.static(__dirname + '/demo', {maxAge: 3600 * 1000 * 3}))

app.use(ErrorHandlerMiddleware)

export default app
export const icon1 = app
