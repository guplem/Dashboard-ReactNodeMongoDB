import { Project } from "../../domain/models/project";
import { ProjectRepository } from "../../domain/repositories/projectRepository";

export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  create(projectData: { [key: string]: any }): Promise<Project> {
    return this.projectRepository.create(projectData as Project);
  }

  getList(sort: string[], range: number[], filter: { [key: string]: any }): Promise<{ projects: Project[]; total: number }> {
    return this.projectRepository.getList(sort, range, filter);
  }
  getOne(id: number | string): Promise<Project> {
    return this.projectRepository.getOne(id as string);
  }

  getMany(filter: { [key: string]: any }): Promise<Project[]> {
    return this.projectRepository.getMany(filter);
  }

  getManyReference(filter: { [key: string]: any }): Promise<Project[]> {
    return this.projectRepository.getManyReference(filter);
  }

  update(id: number | string, project: Project): Promise<Project> {
    return this.projectRepository.update(id as string, project);
  }

  delete(id: number | string): Promise<void> {
    return this.projectRepository.delete(id as string);
  }
}
