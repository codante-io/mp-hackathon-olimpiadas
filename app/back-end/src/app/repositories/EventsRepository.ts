import { AxiosRequestConfig } from 'axios'

import { IAxiosResponse, IGetEventsResponse } from '../../interfaces'
import { IEventsRepository } from '../../interfaces/Repository'
import { EApplicationErrors } from '../../domain/constants'

interface IHTTP {
  get(URL: string, params?: AxiosRequestConfig): Promise<IAxiosResponse>
}

export class EventsRepository implements IEventsRepository {
  constructor(private readonly http: IHTTP) {}

  getEvents = async (params: string): Promise<IGetEventsResponse> => {
    const URL = `/events?${params}`

    try {
      return (await this.http.get(URL)).data
    } catch (err) {
      throw new Error(EApplicationErrors.REQUEST_TO_OLYMPIC_GAMES_API_FAILED)
    }
  }
}
