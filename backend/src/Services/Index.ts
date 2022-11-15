import { Model } from '../Interfaces/ModelInterface';
import { ResponseError } from '../Types/Index';

abstract class Service<T, M> {
  constructor(public model: Model<T, M>) {}

  abstract create(data: M): Promise<T | ResponseError>;
}

export default Service;