import { Response, Request } from 'express';
import { ControllerI } from '../Interfaces/ControllerInterface';
import Service from '../Services/Index';

abstract class Controller<T, M> implements ControllerI {
  abstract route: string;

  constructor(public service: Service<T, M>) {}

  abstract create(req: Request, res: Response):
  Promise<typeof res>;

  abstract getOne(req: Request, res: Response):
  Promise<typeof res>;
}

export default Controller;
