import { Router } from 'express';
import Controller from '../controllers/Index';

class CustomRouter<T, M> {
  constructor(public router: Router) {}

  public addRoute(
    controller: Controller<T, M>,
    route: string = controller.route,
  ) {
    this.router.post(route, controller.create);
  }
}

export default CustomRouter;