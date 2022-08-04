import { makeSchema, objectType, queryType } from 'nexus'
import { join } from 'path'

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

const Meal = objectType({
    name: 'Meal',
    definition(t) {
      t.id('id')
      t.string('name')
      t.string('description')
      t.string('image')
      t.string('location')
      t.string('date')
      t.string('time')
      t.string('user')
    }
}