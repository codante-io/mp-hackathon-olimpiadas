import Joi, { ValidationResult } from 'joi'

import { IGetEventsPayload } from '../../interfaces'

export class EventsPayloadValidator {
  static validateGetEventsPayload = (payload: IGetEventsPayload): ValidationResult<IGetEventsPayload> => {
    return Joi.object({

    }).validate(payload)
  }
}