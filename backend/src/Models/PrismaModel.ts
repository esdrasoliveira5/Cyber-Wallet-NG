import { PrismaClient } from '@prisma/client';
import { Model } from '../Interfaces/ModelInterface';

abstract class PrismaModel<T, M> implements Model<T, M> {
  constructor(public model: PrismaClient) {}
  abstract create(obj: M): Promise<T>;
}
export default PrismaModel;