import { ResponseError } from '../Types/Index';

export interface ServiceI<T, M> {

  create(data: M): Promise<T | ResponseError>;
  
  getOne(data: string): Promise<T | ResponseError>;

}