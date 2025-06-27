import { Project } from "../models/project";

export interface ProjectRepository {
  /**
   * Retrieves a list of projects with sorting, range, and filter options.
   * @param sort - Array of sorting options, e.g., ["title","ASC"].
   * @param range - Array defining the range of items, e.g., [0, 24].
   * @param filter - Object containing filter criteria, e.g., {"title":"bar"}.
   * @returns A promise that resolves to an object containing the projects and the total count.
   */
  getList(sort: string[], range: number[], filter: { [key: string]: any }): Promise<{ projects: Project[]; total: number }>;
  /**
   * Retrieves a single project by its ID.
   * @param id - The ID of the project, e.g., "507f1f77bcf86cd799439011"
   * @returns A promise that resolves to the project.
   */
  getOne(id: string): Promise<Project>;

  /**
   * Retrieves multiple projects based on filter criteria.
   * @param filter - Object containing filter criteria, e.g., {"ids":[123,456,789]}.
   * @returns A promise that resolves to an array of projects.
   */
  getMany(filter: { [key: string]: any }): Promise<Project[]>;

  /**
   * Retrieves multiple projects based on reference filter criteria.
   * @param filter - Object containing reference filter criteria, e.g., {"author_id":345}.
   * @returns A promise that resolves to an array of projects.
   */
  getManyReference(filter: { [key: string]: any }): Promise<Project[]>;

  /**
   * Creates a new project.
   * @param project - The project data to create.
   * @returns A promise that resolves to the created project.
   */
  create(project: Project): Promise<Project>;
  /**
   * Updates a project by its ID.
   * @param id - The ID of the project, e.g., "507f1f77bcf86cd799439011"
   * @param project - The project data to update.
   * @returns A promise that resolves to the updated project.
   */
  update(id: string, project: Project): Promise<Project>;

  /**
   * Deletes a project by its ID.
   * @param id - The ID of the project, e.g., "507f1f77bcf86cd799439011"
   * @returns A promise that resolves when the project is deleted.
   */
  delete(id: string): Promise<void>;
}
