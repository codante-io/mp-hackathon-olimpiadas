import {
  ICompetitor,
  IEvent,
  IGetEventsResponse,
  ILinks,
  IMeta,
} from '../interfaces'

export class ApiAdapter {
  // ICompetitor
  static transformCompetitor(data: any): ICompetitor {
    const competitor: any = {}

    if (data.country_id != null) competitor.countryId = data.country_id
    if (data.country_flag_url != null) competitor.countryFlagUrl = data.country_flag_url
    if (data.competitor_name != null) competitor.competitorName = data.competitor_name
    if (data.position != null) competitor.position = data.position
    if (data.result_position != null) competitor.resultPosition = data.result_position
    if (data.result_winnerLoserTie != null) competitor.resultWinnerLoserTie = data.result_winnerLoserTie
    if (data.result_mark != null) competitor.resultMark = data.result_mark

    return competitor
  }

  // IEvent
  static transformEvent(data: any): IEvent {
    const event: any = {}

    if (data.id != null) event.id = data.id
    if (data.day != null) event.day = data.day
    if (data.discipline_name != null) event.disciplineName = data.discipline_name
    if (data.discipline_pictogram != null) event.disciplinePictogram = data.discipline_pictogram
    if (data.name != null) event.name = data.name
    if (data.venue_name != null) event.venueName = data.venue_name
    if (data.event_name != null) event.eventName = data.event_name
    if (data.detailed_event_name != null) event.detailedEventName = data.detailed_event_name
    if (data.start_date != null) event.startDate = data.start_date
    if (data.end_date != null) event.endDate = data.end_date
    if (data.status != null) event.status = data.status
    if (data.is_medal_event != null) event.isMedalEvent = data.is_medal_event
    if (data.is_live != null) event.isLive = data.is_live
    if (data.competitors != null) event.competitors = data.competitors.map(ApiAdapter.transformCompetitor)

    return event
  }

  // ILinks
  static transformLinks(data: any): ILinks {
    const links: any = {}

    if (data.first != null) links.first = data.first
    if (data.last != null) links.last = data.last
    if (data.prev != null) links.prev = data.prev
    if (data.next != null) links.next = data.next

    return links
  }

  // IMeta
  static transformMeta(data: any): IMeta {
    const meta: any = {}

    if (data.current_page != null) meta.currentPage = data.current_page
    if (data.from != null) meta.from = data.from
    if (data.last_page != null) meta.lastPage = data.last_page
    if (data.path != null) meta.path = data.path
    if (data.per_page != null) meta.perPage = data.per_page
    if (data.to != null) meta.to = data.to
    if (data.total != null) meta.total = data.total

    return meta
  }

  // IGetEventsResponse
  static transformGetEventsResponse(data: any): IGetEventsResponse {
    const response: any = {}

    if (data.data != null) response.data = data.data.map(ApiAdapter.transformEvent)
    if (data.links != null) response.links = ApiAdapter.transformLinks(data.links)
    if (data.meta != null) response.meta = ApiAdapter.transformMeta(data.meta)

    return response
  }
}
