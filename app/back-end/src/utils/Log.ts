import winston from 'winston'

import { Logger } from '..'
import { LoggerContext } from './interfaces/Logger'

export class Log implements Logger {
  private readonly logger: winston.Logger

  constructor(context?: LoggerContext) {
    const transports: any = [new winston.transports.Console()]

    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.timestamp(),
        winston.format.json()
      ),
      defaultMeta: { context },
      transports,
    })
  }

  error(exception: Error, metadata?: Record<string, any>): void {
    global.setImmediate(() => {
      this.logger.log({ level: 'error', message: exception.message, stacktrace: exception.stack, ...metadata })
    })
  }

  log(message: string, metadata?: Record<string, any>): void {
    global.setImmediate(() => {
      this.logger.log({ level: 'info', message, ...metadata })
    })
  }
}