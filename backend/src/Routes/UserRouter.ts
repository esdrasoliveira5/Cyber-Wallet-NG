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
    // this.router.get(route, controller.read);
    // this.router.get(`${route}/:id`, controller.readOne);
    // this.router.put(`${route}/:id`, controller.update);
    // this.router.delete(`${route}/:id`, controller.delete);
  }
}

export default UserRouter;