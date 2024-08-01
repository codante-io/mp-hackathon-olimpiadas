import { Router } from 'express'
import { ExpressAdapter } from '../../../adapters'
import { EventsController } from '../../../controllers'
import { IContext } from '../../../interfaces'

const router = Router()

export default ({ repository }: IContext) => {
  const eventsController = new EventsController(repository)

  router.get('/events', ExpressAdapter.perform(eventsController.getEvents.bind(eventsController)))

  return router
}
