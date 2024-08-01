import express, { Request, Response, Express } from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'

import router from './routes'
import { join } from 'path'
import YAML from 'js-yaml'
import JsonRefs from 'json-refs'
import swaggerUi from 'swagger-ui-express'
import { Healthcheck } from '../../health'

const isProd = process.env.NODE_ENV === 'production'

export default async (context: any): Promise<Express> => {
  const server = express()

  server.use(bodyParser.json())
  server.use(compression())

  /* istanbul ignore next */
  if (isProd) {
    server.use(cors())
    server.use(helmet())
  }

  try {
    const docPath =
      process.env.NODE_ENV === 'development'
        ? join(__dirname, '..', '..', '..', '..', '/docs/api/openapi.yaml')
        : join(__dirname, '..', '..', '..', '/docs/api/openapi.yaml')
    const docs = await JsonRefs.resolveRefsAt(docPath, {
      loaderOptions: {
        processContent: (content: any, callback: any) => {
          callback(undefined, YAML.load(content.text))
        },
      },
    })

    server.use('/docs', swaggerUi.serve, swaggerUi.setup(docs.resolved, { explorer: true }))
  } catch (error: any) {
    console.warn(error.message)
  }

  /*This function is used to kubernetes liveness probe */
  server.get('/health', async (_req: Request, res: Response) => {
    const health = await Healthcheck()
    res.send(health)
  })

  /* istanbul ignore next */
  server.use('/', router(context))

  return server
}
