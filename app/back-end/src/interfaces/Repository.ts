import { 
  IGetEventsPayload,
  IGetEventsResponse,
} from './Events'

export interface IEventsRepository {
  getEvents(payload: IGetEventsPayload): Promise<IGetEventsResponse>
}

export default interface IRepository {
  events: IEventsRepository
}