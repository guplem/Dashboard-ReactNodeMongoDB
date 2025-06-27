import { Evaluation } from "../../domain/models/evaluation";
import { EvaluationRepository } from "../../domain/repositories/evaluationRepository";

export class EvaluationService {
  constructor(private readonly EvaluationRepository: EvaluationRepository) {}

  create(EvaluationData: { [key: string]: any }): Promise<Evaluation> {
    return this.EvaluationRepository.create(EvaluationData as Evaluation);
  }

  getList(sort: string[], range: number[], filter: { [key: string]: any }): Promise<{ evaluations: Evaluation[]; total: number }> {
    return this.EvaluationRepository.getList(sort, range, filter);
  }
  getOne(id: number | string): Promise<Evaluation> {
    return this.EvaluationRepository.getOne(id as string);
  }

  getMany(filter: { [key: string]: any }): Promise<Evaluation[]> {
    return this.EvaluationRepository.getMany(filter);
  }

  getManyReference(filter: { [key: string]: any }): Promise<Evaluation[]> {
    return this.EvaluationRepository.getManyReference(filter);
  }

  update(id: number | string, Evaluation: Evaluation): Promise<Evaluation> {
    return this.EvaluationRepository.update(id as string, Evaluation);
  }

  delete(id: number | string): Promise<void> {
    return this.EvaluationRepository.delete(id as string);
  }
}
