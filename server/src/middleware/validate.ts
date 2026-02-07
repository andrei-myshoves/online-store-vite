import { Request, Response, NextFunction } from 'express'
import { z, ZodError } from 'zod'
import { ApiError } from '../error/ApiError.js'
import { ParamsDictionary } from 'express-serve-static-core'

function zodErrorToMessage(err: ZodError) {
    return err.issues.map(e => `${e.path.join('.')}: ${e.message}`).join('; ')
}

export function validate<T>(schema: z.ZodType<T>) {
    return (req: Request, _res: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body)
            next()
        } catch (err) {
            if (err instanceof ZodError) {
                return next(ApiError.badRequest(zodErrorToMessage(err)))
            }
            next(err)
        }
    }
}

export function validateQuery<T>(schema: z.ZodType<T>) {
    return (req: Request, _res: Response, next: NextFunction) => {
        try {
            req.query = schema.parse(req.query) as typeof req.query
            next()
        } catch (err) {
            if (err instanceof ZodError) {
                return next(ApiError.badRequest(zodErrorToMessage(err)))
            }
            next(err)
        }
    }
}

export function validateBodyAndQuery<TBody, TQuery>(bodySchema: z.ZodType<TBody>, querySchema: z.ZodType<TQuery>) {
    return (req: Request, _res: Response, next: NextFunction) => {
        try {
            req.body = bodySchema.parse(req.body)
            req.query = querySchema.parse(req.query) as typeof req.query
            next()
        } catch (err) {
            if (err instanceof ZodError) {
                return next(ApiError.badRequest(zodErrorToMessage(err)))
            }
            next(err)
        }
    }
}

export function validateParams<T extends ParamsDictionary>(schema: z.ZodType<T>) {
    return (req: Request, _res: Response, next: NextFunction) => {
        try {
            req.params = schema.parse(req.params)
            next()
        } catch (err) {
            if (err instanceof ZodError) {
                return next(ApiError.badRequest(zodErrorToMessage(err)))
            }
            next(err)
        }
    }
}
