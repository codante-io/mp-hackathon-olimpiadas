import express, { Express } from 'express'
import { NoSchemaIntrospectionCustomRule } from 'graphql'
import { graphqlHTTP } from 'express-graphql'
import bodyParser from 'body-parser'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'

import schema from './schema'
import { IContext } from '../../../interfaces'

/* istanbul ignore next */
const isProd = process.env.NODE_ENV === 'production'

export default ({ repository }: IContext): Express => {
  const server = express()

  server.use(bodyParser.json())
  server.use(compression())

  /* istanbul ignore next */
  if (isProd) {
    server.use(cors())
    server.use(helmet())
  }

  /* istanbul ignore next */
  server.use(
    '/graphql',
    graphqlHTTP(async () => ({
      schema,
      context: {
        repository,
      },
      customFormatErrorFn: (err: Error) => err,
      validationRules: isProd ? [NoSchemaIntrospectionCustomRule] : [],
      graphiql: !isProd,
    }))
  )

  return server
}
