import { Model } from "./iModel";

export class Dataset extends Model<Dataset> {
  constructor(public id: string, public name: string) {
    super();
  }

  static fromMap(map: { [key: string]: any }): Dataset {
    return new Dataset(map.id, map.name);
  }
}
