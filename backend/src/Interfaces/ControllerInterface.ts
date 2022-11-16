import { Response, Request } from 'express';

export interface ControllerI {

  create(req: Request, res: Response):
  Promise<typeof res>;
  
  login?(req: Request, res: Response):
  Promise<typeof res>;
}