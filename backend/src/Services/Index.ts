import { ResponseError } from '../Types/Index';
import { Model } from '../Interfaces/ModelInterface';
import { ServiceI } from '../Interfaces/ServiceInterface';

abstract class Service<T, M> implements ServiceI<T, M> {
  constructor(public model: Model<T, M>) {}

  abstract create(data: M): Promise<T | ResponseError>;

  abstract getOne(data: string): Promise<T | ResponseError>;
}

export default Service;