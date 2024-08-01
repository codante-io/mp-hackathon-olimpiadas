import { IContext } from '../interfaces'

export abstract class BaseController {
  constructor(protected readonly repository: IContext['repository']) {}
}
