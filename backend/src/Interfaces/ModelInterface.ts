export interface Model<T> {
  create(obj: T): Promise<T>

  // getOne(obj: T ): Promise<T| null>
  
  // getAll(): Promise<T[]>

  // update(id: string, obj: T): Promise<T | null>

  // delete(id:string): Promise<T | null>;
}