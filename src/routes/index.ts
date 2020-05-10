import { Router } from 'express'
import { router as Auth } from './auth-router'

const routes = Router()

routes.use('/auth', Auth)

export default routes
