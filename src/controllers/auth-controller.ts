import { PrismaClient, User } from '@prisma/client'
import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcryptjs'

const prisma = new PrismaClient()

export const AuthController = {
  login: async (req: Request, res: Response) => {
    const { username, password } = req.body

    if (!(username && password)) res.send(401)

    let user: User | null

    user = await prisma.user.findOne({ where: { username } })

    if (!user) return res.sendStatus(400)

    if (!(await compare(password, user.password))) return res.sendStatus(401)

    const token =
      user && sign({ id: user.id }, process.env.SECRET!, { expiresIn: '1h' })

    res.send({ token })
  },
}
