import { Router } from 'express'

const routes = Router()

routes.use('/', (req, res) => {
  return res.status(200).json({ status: 200, ok: true })
})

export default routes
