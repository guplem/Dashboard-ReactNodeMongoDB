import { Evaluation } from "../models/evaluation";

export interface EvaluationRepository {
  /**
   * Retrieves a list of evaluations with sorting, range, and filter options.
   * @param sort - Array of sorting options, e.g., ["title","ASC"].
   * @param range - Array defining the range of items, e.g., [0, 24].
   * @param filter - Object containing filter criteria, e.g., {"title":"bar"}.
   * @returns A promise that resolves to an object containing the evaluations and the total count.
   */
  getList(sort: string[], range: number[], filter: { [key: string]: any }): Promise<{ evaluations: Evaluation[]; total: number }>;
  /**
   * Retrieves a single evaluation by its ID.
   * @param id - The ID of the evaluation, e.g., "507f1f77bcf86cd799439011"
   * @returns A promise that resolves to the evaluation.
   */
  getOne(id: string): Promise<Evaluation>;

  /**
   * Retrieves multiple evaluations based on filter criteria.
   * @param filter - Object containing filter criteria, e.g., {"ids":[123,456,789]}.
   * @returns A promise that resolves to an array of evaluations.
   */
  getMany(filter: { [key: string]: any }): Promise<Evaluation[]>;

  /**
   * Retrieves multiple evaluations based on reference filter criteria.
   * @param filter - Object containing reference filter criteria, e.g., {"author_id":345}.
   * @returns A promise that resolves to an array of evaluations.
   */
  getManyReference(filter: { [key: string]: any }): Promise<Evaluation[]>;

  /**
   * Creates a new evaluation.
   * @param evaluation - The evaluation data to create.
   * @returns A promise that resolves to the created evaluation.
   */
  create(evaluation: Evaluation): Promise<Evaluation>;
  /**
   * Updates a evaluation by its ID.
   * @param id - The ID of the evaluation, e.g., "507f1f77bcf86cd799439011"
   * @param evaluation - The evaluation data to update.
   * @returns A promise that resolves to the updated evaluation.
   */
  update(id: string, evaluation: Evaluation): Promise<Evaluation>;

  /**
   * Deletes a evaluation by its ID.
   * @param id - The ID of the evaluation, e.g., "507f1f77bcf86cd799439011"
   * @returns A promise that resolves when the evaluation is deleted.
   */
  delete(id: string): Promise<void>;
}
