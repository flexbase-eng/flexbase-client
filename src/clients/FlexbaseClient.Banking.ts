import { DateTime } from 'luxon';
import { Statement } from '../models/Banking/Statement';
import { FlexbaseClientBase } from './FlexbaseClient.Base';
import { FlexbaseResponse } from '../models/FlexbaseResponse';
import { Payment, PaymentForm } from '../models/Banking/Payment';
import { BankingTransaction } from '../models/Banking/Transaction';
import { CreateTokenRequest } from '../models/Banking/UnitcoToken';
import { Deposit, DepositBalance, DepositLimits } from '../models/Banking/Deposit';
import { Counterparty, CtrParty, CounterpartyRequest, CounterpartyApiResponse } from '../models/Banking/Counterparty';
import { Card, CreateCardRequest, CardByUser, UpdateCardRequest } from '../models/Banking/Cards';

interface BankingParameters {
  isPdf?: boolean;
  pageLimit?: number;
  pageOffset?: number;
  fromDate?: DateTime;
  toDate?: DateTime;
  period?: DateTime;
  sort?: string;
  limit?: number;
  offset?: number;
  accountId?: string;
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
  counterparty?: CtrParty;
}

interface DepositsResponse extends FlexbaseResponse {
  accounts?: Deposit[];
}

interface DepositBalanceResponse extends FlexbaseResponse {
  statement?: DepositBalance[];
}

interface PaymentResponse extends FlexbaseResponse {
  payment?: Payment;
}

interface CardsListResponse extends FlexbaseResponse {
  cards?: Card[];
}

interface UserCardResponse extends FlexbaseResponse {
  card?: CardByUser;
}

interface PaymentsListResponse extends FlexbaseResponse {
  payments?: Payment[];
}

interface TransactionsResponse extends FlexbaseResponse {
    transactions?: BankingTransaction[];
}

interface GetUnitcoTokenResponse extends FlexbaseResponse {
    type?: string;
    attributes?: {
      verificationToken: string;
    }
}

interface CreateUnitcoTokenResponse extends FlexbaseResponse {
    asOf?: string,
    expiresIn?: string,
}

export class FlexbaseClientBanking extends FlexbaseClientBase {

  private bankingParams(options?: BankingParameters) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any = {};

      let property: keyof BankingParameters ;
      for (property in options) {
          if (options && Object.hasOwn(options, property)) {
              if (typeof options[property] === 'object') {
                  const newDate = options[property] as DateTime
                  params[property] = newDate.toISO();
              } else if (typeof options[property] === 'boolean') {
                  params[property] = true;
              } else {
                  params[property] = options[property];
              }
          }
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
    async createBankingPayment(companyId: string, PaymentForm: PaymentForm): Promise<PaymentResponse> {
      try {
          const response = await this.client.url(`/banking/${companyId}/moneymovement`).post(PaymentForm).json<PaymentResponse>();

          if (!response.success) {
              this.logger.error('Unable to create a Unit Co. Payment', response.error);
          }

          return response;
      } catch (error) {
          this.logger.error('Unable to create a Unit Co. Payment', error);
          return { success: false, error };
      }
    }

    async getBankingPayments(companyId: string): Promise<PaymentsListResponse> {
      try {
          const response = await this.client.url(`/banking/${companyId}/moneymovement/list`).get().json<PaymentsListResponse>();

          if (!response.success) {
              this.logger.error('Unable to get the list of payments', response.error);
          }

          return response;
      } catch (error) {
          this.logger.error('Unable to get the list of payments', error);
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

  async getBankingCounterparties(companyId: string, options?: BankingParameters): Promise<Counterparty[] | null> {
    try {

        const params = this.bankingParams(options);

        const response = await this.client.url(`/banking/${companyId}/moneymovement/counterparty/list`)
        .query(params).get().json<CounterpartyApiResponse[]>();
        const result = response.map((counterparty) => {
              return {
                id: counterparty?.id,
                companyId: counterparty?.companyId,
                accountNumber: counterparty?.accountNumber,
                routingNumber: counterparty?.response.data.attributes.routingNumber,
                accountType: counterparty?.response.data.attributes.accountType,
                accountName: counterparty?.accountName,
                accessToken: counterparty?.accessToken,
                asOf: counterparty?.asOf,
                byUser: counterparty?.byUser,
                createdAt: counterparty?.createdAt,
                type: counterparty?.type,
                ucCounterpartyId: counterparty?.ucCounterpartyId,
                ucCustomerId: counterparty?.ucCustomerId,
                version: counterparty?.version,
                name: counterparty?.accountName,
              }
        }); 
        return result
    } catch (error) {
        this.logger.error('Error calling Unit Co. Banking Counterparties', error);
        return null;
    }
  }

  // DEPOSIT
  async getBankingAccounts(companyId: string, options?: BankingParameters): Promise<DepositsResponse> {
    try {
        const params = this.bankingParams(options);

        const response = await this.client.url(`/banking/${companyId}/deposits/list`)
        .query(params).get().json<DepositsResponse>();

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

  async getBankingAccountBalance(companyId: string, options?: BankingParameters): Promise<DepositBalanceResponse> {
    try {

        const params = this.bankingParams(options);

        const response = await this.client
        .url(`/banking/${companyId}/deposits/history`)
        .query(params)
        .get()
        .json<DepositBalanceResponse>();

        if (!response.success) {
            this.logger.error(
              'While trying to get banking deposit balance history, an unhandled exception was thrown',
              response.error
            );
        }

        return response;
    } catch (error) {
        this.logger.error('While trying to get banking deposit balance history, an unhandled exception was thrown', error);
        return { success: false, error };
    }
  }

  async getBankingAccountLimits(companyId: string): Promise<DepositLimits> {
    try {

        const response = await this.client.url(`/banking/${companyId}/deposits/limits`).get().json<DepositLimits>();

        if (!response.success) {
            this.logger.error(
              'While trying to get banking deposit limits, an unhandled exception was thrown',
              response.error
            );
        }

            return response;
        } catch (error) {
            this.logger.error('While trying to get banking deposit limits, an unhandled exception was thrown', error);
            return { success: false, error };
        }
    }

    // TRANSACTIONS
    async getBankingTransactions(companyId: string, options?: BankingParameters): Promise<TransactionsResponse> {
        try {
            const params = this.bankingParams(options);

            const response = await this.client.url(`/banking/${companyId}/transactions`).query(params).get().json<TransactionsResponse>();

            if (!response.success) {
                this.logger.error('Unable to get the list of transactions', response.error);
            }

            return response;
        } catch (error) {
            this.logger.error('Unable to get the list of transactions', error);
            return { success: false, error };
        }
    }

    // DEBIT CARDS
    async getBankingDebitCards(companyId: string, options?: BankingParameters): Promise<CardsListResponse> {
        try {

            const params = this.bankingParams(options);

            const response = await this.client.url(`/banking/${companyId}/cards`).query(params).get().json<CardsListResponse>();

            if (!response.success) {
                this.logger.error(
                  'While trying to get banking Cards by Company, an unhandled exception occurred',
                  response.error
                );
            }

            return response;
        } catch (error) {
            this.logger.error('While trying to get banking Cards by Company, an unhandled exception was thrown', error);
            return { success: false, error };
        }
    }

    async createBankingDebitCard(companyId: string, debitCardForm: CreateCardRequest): Promise<UserCardResponse> {
        try {

            const response = await this.client.url(`/banking/${companyId}/cards`).post(debitCardForm).json<UserCardResponse>();

            if (!response.success) {
                this.logger.error(
                  'While trying to create a Unit Co. Debit Card, an unhandled exception was thrown',
                  response.error
                );
            }

            return response;
        } catch (error) {
            this.logger.error('While trying to create a Unit Co. Debit Card, an unhandled exception was thrown', error);
            return { success: false, error };
        }
    }

    async updateBankingDebitCard(companyId: string, debitCardForm: UpdateCardRequest): Promise<UserCardResponse> {
        try {

            const response = await this.client.url(`/banking/${companyId}/cards`).put(debitCardForm).json<UserCardResponse>();

            if (!response.success) {
                this.logger.error(
                  'While trying to update the Unit Co. Debit Card, an unhandled exception was thrown',
                  response.error
                );
            }

            return response;
        } catch (error) {
            this.logger.error('While trying to update the Unit Co. Debit Card, an unhandled exception was thrown', error);
            return { success: false, error };
        }
    }

    // UNITCO TOKEN
    async getUnitcoToken(): Promise<GetUnitcoTokenResponse> {
      try {

          const response = await this.client.url('/unitco/verifToken').get().json<GetUnitcoTokenResponse>();

          if (!response.success) {
              this.logger.error(
                'While trying to create a new Customer Token Verification, an error occurred!',
                response.error
              );
          }

          return response;
      } catch (error) {
          this.logger.error('While trying to create a new Customer Token Verification, an error occurred!', error);
          return { success: false, error };
      }
    }

    async createUnitCoToken(createToken: CreateTokenRequest): Promise<CreateUnitcoTokenResponse> {
      try {

          const response = await this.client.url('/unitco/custToken').post(createToken).json<CreateUnitcoTokenResponse>();

          if (!response.success) {
              this.logger.error(
                'While trying to create a new Customer Token, an error occurred!',
                response.error
              );
          }

          return response;
      } catch (error) {
          this.logger.error('While trying to create a new Customer Token, an error occurred!', error);
          return { success: false, error };
      }
    }
}
