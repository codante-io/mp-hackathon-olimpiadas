import { EventsService } from '../domain/services'
import { EventsPayloadValidator } from '../utils/validations'
import { 
  IGetEventsPayload,
  IGetEventsResponse,
} from '../interfaces'
import { BaseController } from './BaseController'

export class EventsController extends BaseController {
  private readonly _eventsService = new EventsService(this._repositories)

  getEvents = async (payload: IGetEventsPayload): Promise<IGetEventsResponse> => {
    const {
      value,
      error,
    } = EventsPayloadValidator.validateGetEventsPayload(payload)

    if (error) {
      throw error
    }

    return this._eventsService.getEvents(value)
  }
}