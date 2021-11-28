import express from 'express'

export const GET = 'get'
export const POST = 'post'
export const PUT = 'put'
export const DELETE = 'delete'

export type ExpressHandler = (req: express.Request, res: express.Response) => Promise<any>

export class HandlerError extends Error {
    code: number
    context: any

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    constructor(code: number, message?: string, context?: any) {
        super(message)
        this.code = code
        this.context = context
    }
}

export const handlerErrorWrapper = (fn: ExpressHandler) => (req: express.Request, res: express.Response, next: express.NextFunction): Promise<ExpressHandler> => fn(req, res).catch(next)

export const ErrorHandlerMiddleware = (
    err: Error, _req: express.Request, res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/explicit-module-boundary-types
    _next: any
    // @ts-ignore
): express.Response<any, Record<string, any>> => {
    if(err instanceof HandlerError) {
        return res.status(err.code).json({error: err.message, ...err})
    }

    console.error('ERROR in Handler', err)

    if(process.env.NODE_ENV !== 'production') {
        return res.status(500).json({error: err.stack?.split('\n')})
    }

    return res.status(500).json({error: 'fatal-error'})
}

/**
 * Loading express handlers dynamically
 * @example use `app.get`, `app.post` like needed
 * app.get(
 *     '/example/url-path',
 *     (req: express.Request, res: express.Response, next: express.NextFunction) =>
 *         dynamicLoader(
 *             () => import ('./handler/TemplateOfDistributionsHandler').then(module => module.default)
 *         )(req, res).catch(next)
 * )
 */
export const dynamicLoader =
    (importer: () => Promise<ExpressHandler>) =>
        async(req: express.Request, res: express.Response): Promise<ExpressHandler> =>
            importer().then(handler => handler(req, res))
