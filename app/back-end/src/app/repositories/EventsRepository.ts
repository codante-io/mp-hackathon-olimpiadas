import { AxiosRequestConfig } from 'axios'

import { IAxiosResponse, IGetEventsResponse } from '../../interfaces'
import { IEventsRepository } from '../../interfaces/Repository'

interface IHTTP {
  get(URL: string, params?: AxiosRequestConfig): Promise<IAxiosResponse>
}

export class EventsRepository implements IEventsRepository {
  constructor(private readonly http: IHTTP) {}

  getEvents = async (_params: any): Promise<IGetEventsResponse> => {
    const params = '?country=BRA'

    const eventsResponse = await this.http.get('/events', { params })

    return eventsResponse as any
  }
}
