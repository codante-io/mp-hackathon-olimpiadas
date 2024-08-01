import { ExpressAdapter } from '../Adapters'

import {
  EventsController,
} from '../controllers'

const eventsController = new EventsController()

// app.use(jwtVerifierMiddleware)

app.use('/events', ExpressAdapter.perform(eventsController.getEvents))
