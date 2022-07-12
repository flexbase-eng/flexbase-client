import { Project } from '../models/Project/Project';
import { FlexbaseClientBase } from './FlexbaseClient.Base';

interface ProjectsResponse {
    companyId: string;
    contracts: Array<string>;
    description: string;
    id: string;
    location: Array<string>;
    name: string;
}

interface CreateProjectResponse {
  description: string;
  id: string;
  location: {
      address: string;
      city: string;
      postalCode: string;
      state: string;
  },
  name: string;
}

export class FlexbaseClientProject extends FlexbaseClientBase {
    async getCompanyProjects(): Promise<ProjectsResponse[] | null> {
        try {
            const response = await this.client.url('/project/all?full=true').get().json<ProjectsResponse[]>();

            return response;
        } catch (error) {
            this.logger.error('Unable to get company projects', error);
            return null;
        }
    }

    async createOrUpdateProject(projectData: Project): Promise<CreateProjectResponse | null> {
      try {
        const response = await this.client.url('/project').post(projectData).json<CreateProjectResponse>();
  
        return response;
      } catch (error) {
        this.logger.error('Unable to create a project', error);
        return null;
      }
    }
  }
