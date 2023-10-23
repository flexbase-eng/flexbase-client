import { CreateOrUpdateProjectResponse, ProjectData, ProjectsResponse } from '../models/Project/Project.js';
import { FlexbaseClientBase } from './FlexbaseClient.Base.js';

export class FlexbaseClientProject extends FlexbaseClientBase {
  async getCompanyProjects(): Promise<ProjectsResponse[] | null> {
    try {
      return await this.client.url('/project/all?full=true').get().json<ProjectsResponse[]>();
    } catch (error) {
      this.logger.error('Unable to get company projects', error);
      return null;
    }
  }

  async createOrUpdateProject(projectData: ProjectData): Promise<CreateOrUpdateProjectResponse | null> {
    try {
      const response = await this.client.url('/project').post(projectData).json<CreateOrUpdateProjectResponse>();

      return response;
    } catch (error) {
      this.logger.error('Unable to create a project', error);
      return null;
    }
  }
}
