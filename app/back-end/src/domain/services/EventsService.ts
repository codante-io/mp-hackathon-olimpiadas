import { BaseService } from '.'
import {
  IGetEventsPayload,
  IGetEventsResponse,
} from '../../interfaces'

export class EventsService extends BaseService {
  getEvents = async (payload: IGetEventsPayload): Promise<IGetEventsResponse> => this._repositories.events.getEvents(payload) 
}