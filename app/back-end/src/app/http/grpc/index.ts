import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import path from 'path'

import EventsImplementation from './EventsImplementation'

import { IContext } from '../../../interfaces'

const DEFAULT_RPC_CONFS: any = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: false,
  oneofs: true,
}

const eventsPackageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, 'schema.proto'),
  DEFAULT_RPC_CONFS
)

export const EventsRpcService: any = grpc.loadPackageDefinition(eventsPackageDefinition).RpcService

export default (context: IContext) => {
  const grpcServer = new grpc.Server()

  grpcServer.addService(EventsRpcService.service, EventsImplementation(context))

  return grpcServer
}
