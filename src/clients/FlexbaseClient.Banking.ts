import { FlexbaseClientBase } from './FlexbaseClient.Base';
import { FlexbaseResponse } from '../models/FlexbaseResponse';

interface ApplicationResponse extends FlexbaseResponse {
    status?: string;
    url?: string;
}

interface CreateApplicationResponse extends FlexbaseResponse {
    id?: string;
    status?: string;
    message?: string;
}


export class FlexbaseClientBanking extends FlexbaseClientBase {

    async createBankingApplication(companyId: string): Promise<CreateApplicationResponse> {
        try {
  
          const response = await this.client.url(`/banking/${companyId}/application`).post().json<CreateApplicationResponse>();
  
          if (!response.success) {
            this.logger.error(`Unable to create the application for the companyId ${companyId}`, response.error);
          }
      
          return response;
        } catch (error) {
          this.logger.error(`Unable to create the application for the companyId ${companyId}`, error);
          return { success: false, error: `Unable to create the application for the companyId ${companyId}` };
        }
      }

    async getBankingApplicationStatus(companyId: string): Promise<ApplicationResponse> {
      try {

        const response = await this.client.url(`/banking/${companyId}/application`).get().json<ApplicationResponse>();

        if (!response.success) {
          this.logger.error('Unable to get the application status', response.error);
        }
    
        return response;
      } catch (error) {
        this.logger.error('Unable to get the application status', error);
        return { success: false, error: 'Unable to get the application status' };
      }
    }
}
