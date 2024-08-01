import { BaseController } from './BaseController'
import { EventsService } from '../domain/services'
import { EventsPayloadValidator } from '../utils/validations'
import { IGetEventsPayload, IGetEventsResponse } from '../interfaces'
import { DateTime } from 'luxon'

export class EventsController extends BaseController {
  private readonly eventsService = new EventsService(this.repository)

  getEvents = async (payload: IGetEventsPayload): Promise<IGetEventsResponse> => {
    const { value, error } = EventsPayloadValidator.validateGetEventsPayload(payload)

    // Must be called after payload validator for not having issues when generating a new date
    this.formatsPayload(value)

    if (error) {
      throw error
    }

    return this.eventsService.getEvents(value)
  }

  private formatsPayload = (payload: IGetEventsPayload): void => {
    if (payload.date) payload.date = String(DateTime.fromJSDate(new Date(payload.date)).toISODate())
  }
}
