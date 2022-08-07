import { Statement } from '../models/Banking/Statement';
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

interface StatementResponse extends FlexbaseResponse {
  statement?: Statement[] | string;
}

interface BankingParameters {
  isPdf?: boolean;
}


export class FlexbaseClientBanking extends FlexbaseClientBase {

  private bankingParams(options?: BankingParameters) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any = {};

      if (options?.isPdf) {
        params.isPdf = true;
      }

    return params;
  }

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

    async getBankingStatements(companyId: string, statementId?: string, options?: BankingParameters): Promise<StatementResponse> {

      let url = `/banking/${companyId}/statements`;
      let errorMessage = 'Unable to get the list of statements'

        if (statementId) {
          url = `${url}/${statementId}`;
          errorMessage = `Unable to get the statement details for statementId ${statementId}`
        }

      try {

        const params = this.bankingParams(options);

        const response = await this.client.url(url).query(params).get().json<StatementResponse>();

        if (!response.success) {
          this.logger.error(errorMessage, response.error);
        }
    
        return response;
      } catch (error) {
        this.logger.error(errorMessage, error);
        return { success: false, error: errorMessage };
      }
    }
}
