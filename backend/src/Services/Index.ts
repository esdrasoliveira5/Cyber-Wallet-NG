import { ResponseError, TransactionDTO } from '../Types/Index';
import { Model } from '../Interfaces/ModelInterface';
import { ServiceI } from '../Interfaces/ServiceInterface';

abstract class Service<T, M> implements ServiceI<T, M> {
  constructor(public model: Model<T, M>) {}

  abstract create(data: M | TransactionDTO): Promise<T | ResponseError>;

  abstract getOne(data: string | number): Promise<T | ResponseError>;
}

export default Service;