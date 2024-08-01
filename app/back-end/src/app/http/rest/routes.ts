import { Router } from 'express'
import { ExpressAdapter } from '../../../adapters/ExpressAdapter'
import { WelcomeController } from '../../../controllers'

const router = Router()

export default ({ repository, cache, logger }: any) => {
  const welcomeController = new WelcomeController(repository, cache, logger)

  router.get('/welcome', ExpressAdapter.perform(welcomeController.getMessage.bind(welcomeController)))

  return router
}
