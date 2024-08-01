export interface IGetEventsPayload {
  country?: string;
  discipline?: string;
  venue?: string;
  date?: string;
  competitor?: string;
  page?: number;
}

export interface IGetEventsResponse {
  data: IEvent[];
  links: ILinks;
  meta: IMeta;
}

export interface ICompetitor {
  countryId: string;
  countryFlagUrl: string;
  competitorName: string;
  position: number;
  resultPosition: string;
  resultWinnerLoserTie: string;
  resultMark: string;
}

export interface IEvent {
  id: number;
  day: string;
  disciplineName: string;
  disciplinePictogram: string;
  name: string | null;
  venueName: string;
  eventName: string;
  detailedEventName: string;
  startDate: string;
  endDate: string;
  status: string;
  isMedalEvent: number;
  isLive: number;
  competitors: ICompetitor[];
}

export interface ILinks {
  first: string;
  last: string;
  prev: string;
  next: string;
}

export interface IMeta {
  currentPage: number;
  from: number;
  lastPage: number;
  path: string;
  perPage: number;
  to: number;
  total: number;
}
