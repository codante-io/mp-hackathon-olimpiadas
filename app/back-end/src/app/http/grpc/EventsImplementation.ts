import { status } from '@grpc/grpc-js'

import { IContext } from '../../../interfaces'
import { EventsController } from '../../../controllers'

export default ({ repository }: IContext) => ({
  EventsPing: async (_call: any, callback: any) => {
    callback(null, { value: 'PONG' })
  },
  GetEvents: async (call: any, callback: any) => {
    try {
      const controller = new EventsController(repository)

      callback(null, await controller.getEvents(call.request))
    } catch (err: any) {
      callback({ code: status.INTERNAL, message: err.message })
    }
  },
})
