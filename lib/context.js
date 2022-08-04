import { prisma } from '@/lib/prisma'
import { Meal, User } from '@prisma/client'

export const Context = {
  prisma: prisma,
}

export function context() {
  return {
    prisma,
  }
}