import { ResponseError, UserToken } from '../Types/Index';

export interface ServiceI<T, M> {

  create(data: M): Promise<T | ResponseError>;
  
  login?(data: M): Promise<UserToken | ResponseError>

}