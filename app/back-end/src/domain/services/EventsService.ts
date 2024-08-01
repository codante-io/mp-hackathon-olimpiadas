import { BaseService } from './BaseService'
import { ApiAdapter } from '../../adapters'
import { IGetEventsPayload, IGetEventsResponse } from '../../interfaces'

export class EventsService extends BaseService {
  getEvents = async (payload: IGetEventsPayload): Promise<IGetEventsResponse> => {
    const rawData = await this.repository.events.getEvents(this.getParams(payload))

    const formattedEvents = ApiAdapter.transformGetEventsResponse(rawData)

    return formattedEvents
  }

  private getParams = (payload: IGetEventsPayload): string => {
    let params = ''

    for (const field in payload) {
      const currPayloadFieldVal = (payload as any)[field]
      if (currPayloadFieldVal) {
        params += `&${field}=${currPayloadFieldVal}`
      }
    }

    return params
  }
}
