import { ProjectType } from "./projectTypes";

export interface Project {
  id: string;
  name: string;
  type: ProjectType;
  conformityProgress: number;
}
