import { Request, Response, NextFunction } from 'express'

export type JsonError = (
  err: SyntaxError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => void

export type Wrapper = (
  fn: Function
) => (req: Request, res: Response, next: NextFunction) => any

export type Logger = (r: Request, s: Response, n: NextFunction) => void
