import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import path from 'path'

import { WelcomeController } from '../../../controllers'

const packageDefinition = protoLoader.loadSync(
  path.resolve(`${__dirname}/schema.proto`),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: false,
    oneofs: true,
  }
)

export const RpcService: any = grpc.loadPackageDefinition(packageDefinition).RpcService

export default ({ repository, logger, cache }: any) => {
  const grpcServer = new grpc.Server({
    'grpc.default_compression_level': 4,
  })

  grpcServer.addService(RpcService.service, {
    Ping: async (call: any, callback: any) => {
      callback(null, { value: 'PONG' })
    },
    Welcome: async (call: any, callback: any) => {
      const log = logger(
        call?.metadata?.internalRepr['x-request-id'],
        'grpcServer::RpcService::welcome',
        call.request,
      )

      try {
        const controller = new WelcomeController(repository, log, cache)

        callback(null, await controller.getMessage(call.request))
      } catch (err: any) {
        log.error(err)

        callback({ code: grpc.status.INTERNAL, message: err.message })
      }
    },
  })

  return grpcServer
}
