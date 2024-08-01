import { IGetEventsResponse } from './Events'

export interface IEventsRepository {
  getEvents(payload: string): Promise<IGetEventsResponse>
}

export default interface IRepository {
  events: IEventsRepository
}
