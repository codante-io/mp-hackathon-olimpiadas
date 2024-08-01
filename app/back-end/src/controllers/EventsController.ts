import { BaseController } from './BaseController'
import { EventsService } from '../domain/services'
import { EventsPayloadValidator } from '../utils/validations'
import { IGetEventsPayload, IGetEventsResponse } from '../interfaces'

export class EventsController extends BaseController {
  private readonly eventsService = new EventsService(this.repository)

  getEvents = async (payload: IGetEventsPayload): Promise<IGetEventsResponse> => {
    const { value, error } = EventsPayloadValidator.validateGetEventsPayload(payload)

    if (error) {
      throw error
    }

    return this.eventsService.getEvents(value)
  }
}
