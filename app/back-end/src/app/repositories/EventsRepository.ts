import { AxiosRequestConfig } from 'axios'

import { 
  IAxiosResponse, 
  IGetEventsPayload,
  IGetEventsResponse,
} from '../../interfaces'

interface IHTTP {
  get(URL: string, params?: AxiosRequestConfig): Promise<IAxiosResponse>
}

export class EventsRepository {
  constructor(private readonly _http: IHTTP) { }

  getEvents = async (payload: IGetEventsPayload): Promise<IGetEventsResponse> => this._http.get('/', payload)
}