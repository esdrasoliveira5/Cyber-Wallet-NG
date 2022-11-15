import { Response, Request } from 'express';
import Service from '../Services/Index';

abstract class Controller<T, M> {
  abstract route: string;

  constructor(public service: Service<T, M>) {}

  abstract create(req: Request, res: Response):
  Promise<typeof res>;
}

export default Controller;
