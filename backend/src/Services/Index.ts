import { Model } from "../Interfaces/ModelInterface";

abstract class Service<T> {
  constructor(public model: Model<T>) {}

  abstract create(data: T): Promise<T>;

}

export default Service;