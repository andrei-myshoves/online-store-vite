import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../error/ApiError.js'

export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction 
) => {
  if (err instanceof ApiError) {
    res.status(err.status).json({
      success: false,
      message: err.message,
    })
    return
  }

  console.error(err)
  res.status(500).json({
    success: false,
    message: 'Unexpected error',
  })
}
