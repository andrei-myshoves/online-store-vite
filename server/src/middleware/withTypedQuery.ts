import { Request, RequestHandler, Response, NextFunction } from 'express'

type Params = Record<string, string>

/** Request с типизированным req.query */
export type TypedQueryRequest<TQuery> = Request<Params, unknown, unknown, TQuery>

/** Request с типизированным req.body */
export type TypedBodyRequest<TBody> = Request<Params, unknown, TBody>

/** Request с типизированными req.query и req.body */
export type TypedRequest<TQuery, TBody = unknown> = Request<Params, unknown, TBody, TQuery>

/**
 * Оборачивает обработчик с типизированным req.query.
 * Использовать после validateQuery(schema).
 */
export function withTypedQuery<TQuery>(
    handler: (req: TypedQueryRequest<TQuery>, res: Response, next: NextFunction) => void | Promise<void>
): RequestHandler {
    return (req, res, next) => handler(req as TypedQueryRequest<TQuery>, res, next)
}

/**
 * Оборачивает обработчик с типизированным req.body.
 * Использовать после validate(schema).
 */
export function withTypedBody<TBody>(
    handler: (req: TypedBodyRequest<TBody>, res: Response, next: NextFunction) => void | Promise<void>
): RequestHandler {
    return (req, res, next) => handler(req as TypedBodyRequest<TBody>, res, next)
}

/**
 * Оборачивает обработчик с типизированными req.query и req.body.
 * Использовать после validateQuery(querySchema) и validate(bodySchema).
 */
export function withTypedRequest<TQuery, TBody = unknown>(
    handler: (req: TypedRequest<TQuery, TBody>, res: Response, next: NextFunction) => void | Promise<void>
): RequestHandler {
    return (req, res, next) => handler(req as TypedRequest<TQuery, TBody>, res, next)
}
