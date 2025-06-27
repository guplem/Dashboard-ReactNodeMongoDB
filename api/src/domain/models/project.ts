import { Model } from "./iModel";

export class Project extends Model<Project> {
  constructor(public id: string, public name: string, public type: string, public conformityProgress: number) {
    super();
  }

  static fromMap(map: { [key: string]: any }): Project {
    return new Project(map.id, map.name, map.type, map.conformityProgress);
  }
}
