import { makeExecutableSchema } from '@graphql-tools/schema'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
import { join } from 'path'

import { GraphqlAdapter } from '../../../adapters'
import { WelcomeController } from '../../../controllers'
import { DateTime } from 'luxon'

export const baseSchema = loadFilesSync(join(__dirname, 'base.gql'))
export const typeDefs = loadFilesSync(join(__dirname, 'typedefs.gql'))

/* istanbul ignore next */
export const resolvers = {
  Query: {
    welcome: async (_: any, args: any, context: any) => {
      const controller = new WelcomeController(context.repository, context.log, context.cache)

      return GraphqlAdapter.perform(controller.getMessage.bind(controller), args, context)
    },
    health: () => {
      return {
        uptime: process.uptime(),
        timestamp: DateTime.now().toISO(),
      }
    },
  },
}

/* istanbul ignore next */
const baseResolvers = {
  Query: { ping: () => 'PONG' },
  Mutation: { _empty: () => '' },
}

/* istanbul ignore next */
export default makeExecutableSchema({
  typeDefs: mergeTypeDefs([baseSchema, typeDefs]),
  resolvers: mergeResolvers([baseResolvers, resolvers]),
})
