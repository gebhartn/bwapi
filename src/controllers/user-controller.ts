import { PrismaClient, User } from '@prisma/client'
import { Request, Response } from 'express'
import { hash, compare } from 'bcryptjs'

const prisma = new PrismaClient()

export const UserController = {
  create: async (req: Request, res: Response) => {
    let { username, password } = req.body

    if (!(username && password)) return res.sendStatus(401)

    let user: User | null

    user = await prisma.user.findOne({ where: { username } })

    if (user) return res.sendStatus(400)

    password = await hash(password, 10)

    user = await prisma.user.create({ data: { username, password } })

    delete user.password

    res.status(201).send({ user })
  },
  update: async (req: Request, res: Response) => {
    let { previous, password } = req.body

    if (!(previous && password)) return res.sendStatus(401)

    let user: User | null

    let { id } = res.locals.payload

    user = await prisma.user.findOne({ where: { id } })

    if (!user) return res.sendStatus(401)

    if (!(await compare(previous, user.password))) return res.sendStatus(400)

    if (await compare(password, user.password)) return res.sendStatus(400)

    password = await hash(password, 10)

    user = await prisma.user.update({
      where: { id },
      data: { password, version: +user.version + 1 },
    })

    delete user.password

    return res.status(200).send({ user })
  },
}
