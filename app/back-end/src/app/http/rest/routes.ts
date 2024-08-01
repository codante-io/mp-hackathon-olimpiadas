import { Router } from 'express'
import { ExpressAdapter } from '../../../adapters'
import { EventsController } from '../../../controllers'

const router = Router()

export default ({ repository, cache, logger }: any) => {
  const eventsController = new EventsController(repository, cache, logger)

  router.get('/events', ExpressAdapter.perform(eventsController.getEvents.bind(eventsController)))

  return router
}
