import cors from 'cors'
import helmet from 'helmet'
import { verify, sign } from 'jsonwebtoken'
import { json, Application } from 'express'
import { JsonError, Wrapper, Logger } from './types'

export const checkJwt: Logger = (req, res, next) => {
  const token: string = req.headers.authorization || ''
  let payload: any

  try {
    payload = verify(token, process.env.SECRET!)
    res.locals.payload = payload
  } catch (e) {
    return res.send(401)
  }

  const { id } = payload

  const refresh = sign({ id }, process.env.SECRET!, { expiresIn: '1h' })

  res.setHeader('Authorization', refresh)

  return next()
}

// Determines if we have received a malformed JSON request from the client

const parseError = (err: SyntaxError | Error) =>
  err instanceof SyntaxError && (err as any).status === 400 && 'body' in err

// Returns a 400 and the error message on malformed request

const handleJsonError: JsonError = (err, _req, res, next) => {
  if (parseError(err)) {
    return res.status(400).json({ err: (err as any).message })
  }
  return next()
}

// Logging middleware, disabled during production

const logger: Logger = (req, _, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}\n`)
  next()
}

// Wrapper to catch errors thrown inside of route handlers

export const asyncWrapper: Wrapper = fn => (...args) =>
  fn(...args).catch(args[2])

// Env check

const isProduction = (str: string) => str === 'production'

// Composable middleware

export const applyMiddleware = (server: Application) => {
  if (!isProduction(process.env.NODE_ENV!)) {
    server.use(logger)
  }
  server.use(cors())
  server.use(helmet())
  server.use(json())
  server.use(handleJsonError)
}
