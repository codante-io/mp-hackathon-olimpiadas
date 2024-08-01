if (process.env.NODE_ENV === 'production') require('newrelic')

import { ServerCredentials } from '@grpc/grpc-js'
import { Express } from 'express'

import graphql from './http/graphql'
import grpc from './http/grpc'
import context from './context'
import rest from './http/rest'

const server = (graphqlServer: Express, grpcServer: any, restServer: Promise<Express>) => {
  const graphqlPort = process.env.GRAPHQL_PORT || 4000
  const grpcPort = process.env.GRPC_PORT || 50051
  const restPort = process.env.REST_PORT || 3000

  return async () => {
    graphqlServer.listen(graphqlPort, () => {
      global.console.log(`Graphql server ready at http://localhost:${graphqlPort}`)
    })
      ; (await restServer).listen(restPort, () => {
        global.console.log(`Rest server ready at http://localhost:${restPort}`)
      })

    const grpcUri = `0.0.0.0:${grpcPort}`

    grpcServer.bindAsync(grpcUri, ServerCredentials.createInsecure(), () => {
      grpcServer.start()

      global.console.log(`GRPC server ready at ${grpcUri}`)
    })
  }
}

server(graphql(context), grpc(context), rest(context))()
