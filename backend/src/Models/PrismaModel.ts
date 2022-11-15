import { PrismaClient } from '@prisma/client';
import { Model } from '../Interfaces/ModelInterface';

abstract class PrismaModel<T> implements Model<T> {
  constructor(public model: PrismaClient) {}

  abstract create(obj: T): Promise<T>;
}
export default PrismaModel;