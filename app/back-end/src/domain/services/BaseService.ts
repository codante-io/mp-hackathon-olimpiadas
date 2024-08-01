import { IContext } from '../../interfaces'

export abstract class BaseService {
  constructor(
    protected readonly repository: IContext['repository'],
    protected readonly logger: IContext['logger'],
  ) {}
}
