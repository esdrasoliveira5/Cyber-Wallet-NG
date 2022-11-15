export interface Model<T, M> {
  create(obj: M): Promise<T>

  getOne(obj: M): Promise<T | null>
  
  // getAll(): Promise<T[]>

  // update(id: string, obj: T): Promise<T | null>

  // delete(id:string): Promise<T | null>;
}