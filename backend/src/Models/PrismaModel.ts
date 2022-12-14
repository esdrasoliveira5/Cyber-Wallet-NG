import { PrismaClient } from '@prisma/client';
import { Model } from '../Interfaces/ModelInterface';

abstract class PrismaModel<T, M> implements Model<T, M> {
  constructor(public model: PrismaClient) {}
  abstract create(data: M): Promise<T>;
  abstract getOne(data: string | number): Promise<T | null>;
  abstract getAll(data: null | number): Promise<T[]>;
}
export default PrismaModel;