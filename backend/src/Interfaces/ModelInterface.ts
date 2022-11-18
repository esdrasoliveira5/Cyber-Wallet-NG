export interface Model<T, M> {
  create(data: M): Promise<T>

  getOne(data: string | number): Promise<T | null>
  
  getAll(data: number | null): Promise<T[]>

  // update(id: string, obj: T): Promise<T | null>

  // delete(id:string): Promise<T | null>;
}