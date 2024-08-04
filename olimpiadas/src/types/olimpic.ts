/**
 * Represents the response structure of an API call.
 * @template Event - The type of the data property in the response.
 */
/**
 * Represents the response from an API.
 */
export interface ApiResponse {
  /**
   * The data returned by the API.
   */
  data: Event[];

  /**
   * The links related to the API response.
   */
  links: {
    /**
     * The URL of the first page.
     */
    first: string;

    /**
     * The URL of the last page.
     */
    last: string;

    /**
     * The URL of the previous page. Can be null if on the first page.
     */
    prev: string | null;

    /**
     * The URL of the next page. Can be null if on the last page.
     */
    next: string | null;
  };

  /**
   * The metadata related to the API response.
   */
  meta: {
    /**
     * The current page number.
     */
    current_page: number;

    /**
     * The starting index of the data in the current page.
     */
    from: number;

    /**
     * The last page number.
     */
    last_page: number;

    /**
     * The path of the API endpoint.
     */
    path: string;

    /**
     * The number of items per page.
     */
    per_page: number;

    /**
     * The ending index of the data in the current page.
     */
    to: number;

    /**
     * The total number of items.
     */
    total: number;
  };
}

export interface Event {
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
