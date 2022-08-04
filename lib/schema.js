import { makeSchema, objectType, queryType } from 'nexus'
import { join } from 'path'

const Query = queryType({
    definition(t) {
      t.list.field('meals', {
        type: 'Meal',
        args: {
          first: 'Int',
        },
        resolve(_root, args, ctx) {
          return ctx.prisma.meal.findMany({
            take: args.first,
          })
        }
      })
    }
})

const User = objectType({
    name: 'User',
    definition(t) {
      t.int('id')
      t.string('name')
      t.string('username')
      t.string('email')
      t.string('image')
    },
})

const Meal = objectType({
    name: 'Meal',
    definition(t) {
      t.int('id')
      t.string('name')
      t.string('endDate')
      t.string('voteDate')
      // t.string('location')
      t.float('lat')
      t.float('long')
      t.int('distance')
      t.field('organizer', {
        type: 'User',
        async resolve(meal, _args, ctx) {
          const user = await ctx.prisma.user.findFirst({
            where: { id: meal.organizerId },
          })
          return user
        },
      })
    },
})

export const schema = makeSchema({
  types: [Query, Meal, User],
  shouldGenerateArtifacts: process.env.NODE_ENV !== 'production',
  outputs: {
    schema: join(process.cwd(), 'lib/schema.graphql'),
  },
  sourceTypes: {
    modules: [{ module: '@lib/prisma', alias: 'prisma' }],
    debug: process.env.NODE_ENV !== 'production',
  },
  contextType: {
    module: join(process.cwd(), 'lib/context'),
    export: 'Context',
  },
  nonNullDefaults: {
    input: true,
    output: true,
  },
})