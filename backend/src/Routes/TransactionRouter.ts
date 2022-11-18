import { Router } from 'express';
import TransactionController from '../controllers/TransactionController';

class TransactionRouter {
  constructor(public router: Router) {}

  public addRoute(
    controller: TransactionController,
    route: string = controller.route,
  ) {
    this.router.post(route, controller.create);
    this.router.get(`${route}/:id`, controller.getOne);
    this.router.get(`${route}`, controller.getAll);
  }
}

export default TransactionRouter;