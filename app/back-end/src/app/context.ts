import { IContext } from '../interfaces'
import { HTTPRequest } from './http'
import { EventsRepository } from './repositories'

const OLYMPIC_GAMES_URL = ''

const httpRequest = new HTTPRequest(OLYMPIC_GAMES_URL)

const ctx: IContext = {
  repository: {
    events: new EventsRepository(httpRequest), 
  },
  logger: (xRequestId: string, path: string, params: any) => new Log({
    ['x-request-id']: xRequestId,
    ['origin']: path,
    ['params']: params,
  }),
}

export default ctx