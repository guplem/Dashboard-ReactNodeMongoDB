import { PrismaClient } from "@prisma/client";
import { Evaluation } from "../../domain/models/evaluation";
import { EvaluationRepository } from "../../domain/repositories/evaluationRepository";

const prisma = new PrismaClient();

export class PrismaEvaluationRepository implements EvaluationRepository {
  async getList(sort: string[], range: number[], filter: { [key: string]: any }): Promise<{ evaluations: Evaluation[]; total: number }> {
    const orderBy: { [key: string]: "asc" | "desc" }[] = [];
    for (let i = 0; i < sort.length; i += 2) {
      const field = sort[i];
      const direction = sort[i + 1]?.toLowerCase();
      if (field && (direction === "asc" || direction === "desc")) {
        orderBy.push({ [field]: direction });
      } else {
        throw new Error(`Invalid sort parameter: ${field} - ${direction}`);
      }
    }

    const evaluations = await prisma.evaluation.findMany({
      where: filter,
      orderBy: orderBy,
      skip: range[0],
      take: range[1] - range[0] + 1,
      include: {
        project: true,
        dataset: true,
        system: true,
      },
    });

    const total = await prisma.evaluation.count({ where: filter });
    return {
      evaluations: evaluations.map((evaluation) => Evaluation.fromMap(evaluation)),
      total,
    };
  }

  async getOne(id: string): Promise<Evaluation> {
    const evaluation = await prisma.evaluation.findUnique({
      where: { id },
      include: {
        project: true,
        dataset: true,
        system: true,
      },
    });
    if (!evaluation) throw new Error("Evaluation not found");
    return Evaluation.fromMap(evaluation);
  }

  async getMany(filter: { [key: string]: any }): Promise<Evaluation[]> {
    const evaluations = await prisma.evaluation.findMany({
      where: filter,
      include: {
        project: true,
        dataset: true,
        system: true,
      },
    });
    return evaluations.map((evaluation) => Evaluation.fromMap(evaluation));
  }

  async getManyReference(filter: { [key: string]: any }): Promise<Evaluation[]> {
    const evaluations = await prisma.evaluation.findMany({
      where: filter,
      include: {
        project: true,
        dataset: true,
        system: true,
      },
    });
    return evaluations.map((evaluation) => Evaluation.fromMap(evaluation));
  }

  async create(evaluation: Evaluation): Promise<Evaluation> {
    const createdEvaluation = await prisma.evaluation.create({
      data: {
        id: evaluation.id,
        projectId: evaluation.projectId,
        systemId: evaluation.systemId,
        datasetId: evaluation.datasetId,
        score: Number(evaluation.score),
        accuracy: evaluation.accuracy,
        relevancy: evaluation.relevancy,
        helpfulness: evaluation.helpfulness,
        toxicity: evaluation.toxicity,
        date: evaluation.date,
      },
    });
    return Evaluation.fromMap(createdEvaluation);
  }

  async update(id: string, evaluation: Evaluation): Promise<Evaluation> {
    const updatedEvaluation = await prisma.evaluation.update({
      where: { id },
      data: {
        projectId: evaluation.projectId,
        systemId: evaluation.systemId,
        datasetId: evaluation.datasetId,
        score: Number(evaluation.score),
        accuracy: evaluation.accuracy,
        relevancy: evaluation.relevancy,
        helpfulness: evaluation.helpfulness,
        toxicity: evaluation.toxicity,
        date: evaluation.date,
      },
    });
    return Evaluation.fromMap(updatedEvaluation);
  }

  async delete(id: string): Promise<void> {
    await prisma.evaluation.delete({ where: { id } });
  }
}
