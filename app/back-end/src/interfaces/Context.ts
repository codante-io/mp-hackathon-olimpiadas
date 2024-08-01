import IRepository from './Repository'

export interface IContext {
  repository: IRepository
  logger: (xRequestId: string, path: string, params: any) => Logger
}
