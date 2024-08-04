export interface ApiResponse {
  data: Event[];
  links: {
    first: string;
    last: string;
    prev: string | null; // 'prev' can be null if on the first page
    next: string | null; // 'next' can be null if on the last page
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

interface Event {
  id: number;
  day: string; // ISO 8601 date string
  discipline_name: string;
  discipline_pictogram: string;
  name: string | null;
  venue_name: string;
  event_name: string;
  detailed_event_name: string;
  start_date: string; // ISO 8601 datetime string
  end_date: string; // ISO 8601 datetime string
  status: string;
  is_medal_event: number; // 0 or 1
  is_live: number; // 0 or 1
  gender_code: string;
  competitors: Competitor[];
}

interface Competitor {
  country_id: string;
  country_flag_url: string;
  competitor_name: string;
  position: number;
  result_position: string;
  result_winnerLoserTie: string; // "W", "L", "T" (Win, Loss, Tie)
  result_mark: string; // Could be a score, time, etc.
}
