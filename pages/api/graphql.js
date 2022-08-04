import { createServer } from '@graphql-yoga/node'
import { schema } from '@lib/schema'
import { context } from '@lib/context'

const server = createServer({
  schema,
  context,
  endpoint: '/api/graphql',
})

export default server