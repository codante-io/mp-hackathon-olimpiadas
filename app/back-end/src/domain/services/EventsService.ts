import { BaseService } from './BaseService'
import { IGetEventsPayload, IGetEventsResponse } from '../../interfaces'

export class EventsService extends BaseService {
  getEvents = async (payload: IGetEventsPayload): Promise<IGetEventsResponse> => {
    return this.repository.events.getEvents(payload)
  }
}
