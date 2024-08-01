export enum EApplicationErrors {
  REQUEST_TO_OLYMPIC_GAMES_API_FAILED = 'REQUEST_TO_OLYMPIC_GAMES_API_FAILED',
}

export enum EEventsPayloadErrors {
  COUNTRY_MUST_BE_A_STRING = 'Country must be a string.',
  DISCIPLINE_MUST_BE_A_STRING = 'Discipline must be a string.',
  VENUE_MUST_BE_A_STRING = 'Venue must be a string.',
  DATE_MUST_BE_A_VALID_DATE = 'Date must be a valid date.',
  COMPETITOR_MUST_BE_A_STRING = 'Competitor must be a string.',
  PAGE_MUST_BE_A_NUMBER = 'Page must be a number.',
  PAGE_MUST_BE_AN_INTEGER = 'Page must be an integer.',
  PAGE_MUST_BE_GREATER_THAN_0 = 'Page must be greater than 0.'
}
