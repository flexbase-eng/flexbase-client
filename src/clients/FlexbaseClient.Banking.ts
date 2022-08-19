import { DateTime } from 'luxon';
import { Statement } from '../models/Banking/Statement';
import { FlexbaseClientBase } from './FlexbaseClient.Base';
import { FlexbaseResponse } from '../models/FlexbaseResponse';
import { Payment, PaymentForm } from '../models/Banking/Payment';
import { Deposit, DepositHistory } from '../models/Banking/Deposit';
import { Counterparty, CtrParty, CounterpartyRequest, ListRequest } from '../models/Banking/Counterparty';

interface BankingParameters {
  isPdf?: boolean;
  pageLimit?: number;
  pageOffset?: number;
  fromDate?: DateTime;
  toDate?: DateTime;
}

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

interface CounterpartyResponse extends FlexbaseResponse {
  ctrParty?: CtrParty;
}

interface CounterpartiesListResponse extends FlexbaseResponse {
  data?: Counterparty[];
}

interface DepositHistoryResponse extends FlexbaseResponse {
  statement?: DepositHistory[];
}


export class FlexbaseClientBanking extends FlexbaseClientBase {

  private bankingParams(options?: BankingParameters) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any = {};

      if (options?.isPdf) {
        params.isPdf = true;
      }

      if (options?.fromDate) {
        params.fromDate = options.fromDate.toISO();
      }

      if (options?.toDate) {
        params.toDate = options.toDate.toISO();
      }

      if (options?.pageLimit) {
        params.pageLimit = options.pageLimit;
      }

      if (options?.pageOffset) {
        params.pageOffset = options.pageOffset;
      }

    return params;
  }

  // APPLICATION
    async createBankingApplication(companyId: string): Promise<CreateApplicationResponse> {
        try {
            const response = await this.client.url(`/banking/${companyId}/application`).post().json<CreateApplicationResponse>();

            if (!response.success) {
                this.logger.error(`Unable to create the application for the companyId ${companyId}`, response.error);
            }

            return response;
        } catch (error) {
            this.logger.error(`Unable to create the application for the companyId ${companyId}`, error);
            return { success: false, error };
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
            return { success: false, error };
        }
    }
  
  // STATEMENTS  
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
        return { success: false, error };
      }
    }

  // PAYMENTS
    async createBankingPayment(companyId: string, PaymentForm: PaymentForm): Promise<Payment> {
      try {
          const response = await this.client.url(`/banking/${companyId}/moneymovement`).post(PaymentForm).json<Payment>();

          if (!response.success) {
              this.logger.error('Unable to create a Unit Co. Payment', response.error);
          }

          return response;
      } catch (error) {
          this.logger.error('Unable to create a Unit Co. Payment', error);
          return { success: false, error };
      }
    }

  // COUNTERPARTIES
  async createBankingCounterparty(companyId: string, counterpartyRequest: CounterpartyRequest): Promise<CounterpartyResponse> {
    try {
        const response = await this.client.url(`/banking/${companyId}/moneymovement/counterparty`)
        .post(counterpartyRequest).json<CounterpartyResponse>();

        if (!response.success) {
            this.logger.error(
              'Unable to create a Unit Co. Counter Party. Please verify that all the Counterparty banking data required exists',
              response.error
            );
        }

        return response;
    } catch (error) {
        this.logger.error(
          'Unable to create a Unit Co. Counter Party. Please verify that all the Counterparty banking data required exists',
          error
        );
        return { success: false, error };
    }
  }

  async getBankingCounterparties(companyId: string, listRequest?: ListRequest): Promise<CounterpartiesListResponse> {
    try {
        const response = await this.client.url(`/banking/${companyId}/moneymovement/counterparty/list`)
        .post(listRequest).json<CounterpartiesListResponse>();

        if (!response.success) {
            this.logger.error('Error calling Unit Co. Banking Counterparties', response.error);
        }

        return response;
    } catch (error) {
        this.logger.error('Error calling Unit Co. Banking Counterparties', error);
        return { success: false, error };
    }
  }

  // DEPOSIT
  async getBankingAccount(companyId: string): Promise<Deposit> {
    try {
        const response = await this.client.url(`/banking/${companyId}/deposits`).get().json<Deposit>();

        if (!response.success) {
            this.logger.error(
              'While trying to get a banking deposit account, an unhandled exception was thrown',
              response.error
            );
        }

        return response;
    } catch (error) {
        this.logger.error('While trying to get a banking deposit account, an unhandled exception was thrown', error);
        return { success: false, error };
    }
  }

  async getBankingAccountHistory(companyId: string, options?: BankingParameters): Promise<DepositHistoryResponse> {
    try {

        const params = this.bankingParams(options);

        const response = await this.client
        .url(`/banking/${companyId}/deposits/history`)
        .query(params)
        .get()
        .json<DepositHistoryResponse>();

        if (!response.success) {
            this.logger.error(
              'While trying to get banking deposit history, an unhandled exception was thrown',
              response.error
            );
        }

        return response;
    } catch (error) {
        this.logger.error('While trying to get banking deposit history, an unhandled exception was thrown', error);
        return { success: false, error };
    }
  }
}
