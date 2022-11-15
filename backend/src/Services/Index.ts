import { Model } from '../Interfaces/ModelInterface';

abstract class Service<T, M> {
  constructor(public model: Model<T, M>) {}

  abstract create(data: M): Promise<T>;
}

export default Service;