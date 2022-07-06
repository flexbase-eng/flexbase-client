import { FlexbaseClientBase } from './FlexbaseClient.Base';

interface ProjectsResponse {
  companyId: string;
  contracts: Array<string>;
  description: string;
  id: string;
  location: Array<string>;
  name: string;
}

export class FlexbaseClientProject extends FlexbaseClientBase {
  async getCompanyProjects(): Promise<ProjectsResponse[]> {
    try {
      const response = await this.client.url('/project/all?full=true').get().json<ProjectsResponse[]>();

      return response;
    } catch (error) {
      console.error('Unable to get company projects', error);
      return [];
    }
  }
}