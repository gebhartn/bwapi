import express from 'express'
import routes from '../routes'
import { applyMiddleware } from '../lib'

const app = express()

applyMiddleware(app)

app.use('/', routes)

export default app
