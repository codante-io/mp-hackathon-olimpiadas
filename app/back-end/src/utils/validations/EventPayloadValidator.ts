import Joi, { ValidationResult } from 'joi'
import { IGetEventsPayload } from '../../interfaces'
import { EEventsPayloadErrors } from '../../domain/constants'

export class EventsPayloadValidator {
  static validateGetEventsPayload = (payload: IGetEventsPayload): ValidationResult<IGetEventsPayload> => {
    return Joi.object({
      country: Joi.string().messages({
        'string.base': EEventsPayloadErrors.COUNTRY_MUST_BE_A_STRING,
      }),
      discipline: Joi.string().messages({
        'string.base': EEventsPayloadErrors.DISCIPLINE_MUST_BE_A_STRING,
      }),
      venue: Joi.string().messages({
        'string.base': EEventsPayloadErrors.VENUE_MUST_BE_A_STRING,
      }),
      date: Joi.date().iso().raw().messages({
        'date.base': EEventsPayloadErrors.DATE_MUST_BE_A_VALID_DATE,
        'date.isoDate': EEventsPayloadErrors.DATE_MUST_BE_A_VALID_DATE,
      }),
      competitor: Joi.string().messages({
        'string.base': EEventsPayloadErrors.COMPETITOR_MUST_BE_A_STRING,
      }),
      page: Joi.number().integer().greater(0).messages({
        'number.base': EEventsPayloadErrors.PAGE_MUST_BE_A_NUMBER,
        'number.integer': EEventsPayloadErrors.PAGE_MUST_BE_AN_INTEGER,
        'number.greater': EEventsPayloadErrors.PAGE_MUST_BE_GREATER_THAN_0,
      }),
    }).validate(payload)
  }
}
