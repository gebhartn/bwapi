import { Router } from 'express'
import { User } from '../controllers'
import { Auth } from '../controllers'
import { checkJwt, asyncWrapper } from '../lib'

export const router = Router()

router.post('/register', asyncWrapper(User.create))
router.post('/login', asyncWrapper(Auth.login))
router.put('/update', [checkJwt], asyncWrapper(User.update))
