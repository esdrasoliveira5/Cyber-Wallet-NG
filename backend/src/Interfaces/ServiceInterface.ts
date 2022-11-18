import { ResponseError } from '../Types/Index';

export interface ServiceI<T, M> {

  create(data: M): Promise<T | ResponseError>;
  
  getOne(data: string | number): Promise<T | ResponseError>;

  getAll(data: number | null): Promise<T[]>;

}