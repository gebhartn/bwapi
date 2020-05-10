import { Router } from 'express'
import { checkJwt } from '../lib'
import { UserController as User } from '../controllers/user-controller'
import { AuthController as Auth } from '../controllers/auth-controller'

export const router = Router()

router.post('/register', User.create)
router.post('/login', Auth.login)
router.put('/update', [checkJwt], User.update)

