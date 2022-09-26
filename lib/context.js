import { prisma } from '@/lib/prisma'
import { Herd, User } from '@prisma/client'

export const Context = {
  prisma: prisma,
}

export function context() {
  return {
    prisma,
  }
}
