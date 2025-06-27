import { PrismaClient, ProjectType } from "@prisma/client";
import { Project } from "../../domain/models/project";
import { ProjectRepository } from "../../domain/repositories/projectRepository";

const prisma = new PrismaClient();

export class PrismaProjectRepository implements ProjectRepository {
  async getList(sort: string[], range: number[], filter: { [key: string]: any }): Promise<{ projects: Project[]; total: number }> {
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

    const projects = await prisma.project.findMany({
      where: filter,
      orderBy: orderBy,
      skip: range[0],
      take: range[1] - range[0] + 1,
    });

    const total = await prisma.project.count({ where: filter });
    return { projects: projects.map((project) => Project.fromMap(project)), total };
  }

  async getOne(id: string): Promise<Project> {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) throw new Error("Project not found");
    return Project.fromMap(project);
  }

  async getMany(filter: { [key: string]: any }): Promise<Project[]> {
    const projects = await prisma.project.findMany({ where: filter });
    return projects.map((project) => Project.fromMap(project));
  }

  async getManyReference(filter: { [key: string]: any }): Promise<Project[]> {
    const projects = await prisma.project.findMany({ where: filter });
    return projects.map((project) => Project.fromMap(project));
  }

  async create(project: Project): Promise<Project> {
    const createdProject = await prisma.project.create({
      data: {
        name: project.name,
        type: ProjectType[project.type as keyof typeof ProjectType],
        conformityProgress: project.conformityProgress,
      },
    });
    return Project.fromMap(createdProject);
  }

  async update(id: string, project: Project): Promise<Project> {
    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        name: project.name,
        type: ProjectType[project.type as keyof typeof ProjectType],
        conformityProgress: project.conformityProgress,
      },
    });
    return Project.fromMap(updatedProject);
  }

  async delete(id: string): Promise<void> {
    await prisma.project.delete({ where: { id } });
  }
}
