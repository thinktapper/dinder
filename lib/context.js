import { prisma } from '../lib/prisma'
import { Meal, User } from '../lib/prisma/generated/prisma-client'

export interface Context {
  prisma: prisma,
}

export function context(): Context {
  return {
    prisma,
  }
}