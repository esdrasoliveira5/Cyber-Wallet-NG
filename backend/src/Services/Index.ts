import { Model } from '../Interfaces/ModelInterface';

abstract class Service<T, M> {
  constructor(public model: Model<T>) {}

  abstract create(data: M): Promise<T>;
}

export default Service;