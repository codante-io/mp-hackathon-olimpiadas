import { IContext } from '../interfaces'
import { HTTPRequest } from './http'
import { EventsRepository } from './repositories'

const httpRequest = new HTTPRequest(process.env.OLYMPIC_GAMES_URL ?? '')

const ctx: IContext = {
  repository: {
    events: new EventsRepository(httpRequest), 
  },
}

export default ctx