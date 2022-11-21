import {
  ResponseError,
  Token,
  TransactionDTO,
  TransactionsFilters,
} from '../Types/Index';
import { Model } from '../Interfaces/ModelInterface';
import { ServiceI } from '../Interfaces/ServiceInterface';

abstract class Service<T, M> implements ServiceI<T, M> {
  constructor(public model: Model<T, M>) {}

  abstract create(data: M | TransactionDTO): 
  Promise<T | Token<T> | ResponseError >;

  abstract getOne(data: string | number): Promise<T | ResponseError>;

  abstract getAll(
    data: number | null,
    query: null | TransactionsFilters): Promise<T[]>;
}

export default Service;