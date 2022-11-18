import { Router } from 'express';
import UserController from '../controllers/UserController';

class UserRouter {
  constructor(public router: Router) {}

  public addRoute(
    controller: UserController,
    route: string = controller.route,
  ) {
    this.router.post(route, controller.create);
    this.router.post('/login', controller.login);
    this.router.get(`${route}/account`, controller.getAccount);
    this.router.get(`${route}/:username`, controller.getOne);
    this.router.get(`${route}/`, controller.getAll);
  }
}

export default UserRouter;