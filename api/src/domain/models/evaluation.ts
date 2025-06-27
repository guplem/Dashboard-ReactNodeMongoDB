import { Dataset } from "./dataset";
import { Model } from "./iModel";
import { Project } from "./project";
import { System } from "./system";

export class Evaluation extends Model<Evaluation> {
  constructor(
    public id: string,
    public projectId: string,
    public systemId: string,
    public datasetId: string,
    public score: number,
    public accuracy?: number | null,
    public relevancy?: number | null,
    public helpfulness?: number | null,
    public toxicity?: number | null,
    public date: Date = new Date(),
    public project: Project | null = null,
    public system: System | null = null,
    public dataset: Dataset | null = null
  ) {
    super();
  }

  static fromMap(map: { [key: string]: any }): Evaluation {
    return new Evaluation(
      map.id,
      map.projectId,
      map.systemId,
      map.datasetId,
      map.score,
      map.accuracy,
      map.relevancy,
      map.helpfulness,
      map.toxicity,
      new Date(map.date),
      map.project ? Project.fromMap(map.project) : null,
      map.system ? System.fromMap(map.system) : null,
      map.dataset ? Dataset.fromMap(map.dataset) : null
    );
  }
}
