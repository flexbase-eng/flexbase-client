import { DateTime } from 'luxon';
import { Statement } from '../models/Banking/Statement';
import { FlexbaseClientBase } from './FlexbaseClient.Base';
import { FlexbaseResponse } from '../models/FlexbaseResponse';
import { Payment, PaymentForm } from '../models/Banking/Payment';
import { BankingTransaction } from '../models/Banking/Transaction';
import { CreateTokenRequest } from '../models/Banking/UnitcoToken';
import { Deposit, DepositBalance, DepositLimits } from '../models/Banking/Deposit';
import { Counterparty, CounterpartyRequest, CounterpartyApiResponse, CounterpartyData } from '../models/Banking/Counterparty';
import { Card, CreateCardRequest, CardByUser, UpdateCardRequest, IssueCard, PinStatus, ReportDebitCardRequest } from '../models/Banking/Cards';

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
    cardId?: string;
    full?: boolean;
}

interface ApplicationResponse extends FlexbaseResponse {
    status?: string;
    type?: string;
    url?: string;
}

interface CreateApplicationResponse extends FlexbaseResponse {
    id?: string;
    status?: string;
    message?: string;
}

interface StatementsResponse extends FlexbaseResponse {
    statement?: Statement[];
}

interface SingleStatementResponse {
    error?: string;
    success?: boolean;
    statement?: string | ArrayBuffer;
}

interface LinkCounterpartyApiResponse extends FlexbaseResponse {
    counterparty?: CounterpartyData;
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

interface IssueCardResponse extends FlexbaseResponse {
    issuedCard?: IssueCard;
    card?: CardByUser;
}

interface UpdateCardResponse extends FlexbaseResponse {
    card?: CardByUser;
}

interface GetPinStatusResponse extends FlexbaseResponse {
    status?: PinStatus;
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
    };
}

interface CreateUnitcoTokenResponse extends FlexbaseResponse {
    asOf?: string;
    expiresIn?: number;
    accessToken?: string;
}

export class FlexbaseClientBanking extends FlexbaseClientBase {
    private bankingParams(options?: BankingParameters) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const params: any = {};

        let property: keyof BankingParameters;
        for (property in options) {
            if (options && Object.hasOwn(options, property)) {
                if (typeof options[property] === 'object') {
                    const newDate = options[property] as DateTime;
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
    async getBankingStatements(companyId: string, statementId?: string, options?: BankingParameters): Promise<StatementsResponse> {
        try {
            const params = this.bankingParams(options);

            const response = await this.client.url(`/banking/${companyId}/statements`).query(params).get().json<StatementsResponse>();

            if (!response.success) {
                this.logger.error('Unable to get the list of statements', response.error);
            }

            return response;
        } catch (error) {
            this.logger.error('Unable to get the list of statements', error);
            return { success: false, error };
        }
    }

    async getBankingStatementPdf(companyId: string, statementId: string, options?: BankingParameters): Promise<SingleStatementResponse> {
        try {
            const params = this.bankingParams(options);

            let response;

            if (options?.isPdf) {
                response = await this.client.url(`/banking/${companyId}/statements/${statementId}`).query(params).get().arrayBuffer();
            } else {
                response = await this.client.url(`/banking/${companyId}/statements/${statementId}`).query(params).get().json();
            }

            if (!response.success) {
                this.logger.error(`Unable to get the statement details for statementId ${statementId}`, response.error);
            }

            return response;
        } catch (error) {
            this.logger.error(`Unable to get the statement details for statementId ${statementId}`, error);
            return { success: false, error: `Unable to get the statement details for statementId ${statementId}` };
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
    async createBankingCounterparty(companyId: string, counterpartyRequest: CounterpartyRequest): Promise<Counterparty | null> {
        try {
            const response = await this.client
                .url(`/banking/${companyId}/moneymovement/counterparty`)
                .post(counterpartyRequest)
                .json<LinkCounterpartyApiResponse>();

            if (response.success && response.counterparty) {
                return {
                    id: response?.counterparty?.id || '',
                    companyId: response?.counterparty?.companyId || '',
                    accountNumber: response?.counterparty?.accountNumber || '',
                    routingNumber: response?.counterparty?.response.data.attributes.routingNumber || '',
                    accountType: response?.counterparty?.response.data.attributes.accountType || '',
                    accountName: response?.counterparty?.accountName || '',
                    accessToken: response?.counterparty?.accessToken || '',
                    asOf: response?.counterparty?.asOf || '',
                    byUser: response?.counterparty?.byUser || '',
                    createdAt: response?.counterparty?.createdAt || '',
                    type: response?.counterparty?.response.data.attributes.type || '',
                    ucCounterpartyId: response?.counterparty?.ucCounterpartyId || '',
                    ucCustomerId: response?.counterparty?.ucCustomerId || '',
                    version: response?.counterparty?.version || -1,
                    name: response?.counterparty?.accountName || '',
                };
            }
            return null;
        } catch (error) {
            this.logger.error(
                'Unable to create a Unit Co. Counter Party. Please verify that all the Counterparty banking data required exists',
                error
            );
            return null;
        }
    }

    async getBankingCounterparties(companyId: string, options?: BankingParameters): Promise<Counterparty[] | null> {
        try {
            const params = this.bankingParams(options);
            const response = await this.client
                .url(`/banking/${companyId}/moneymovement/counterparty/list`)
                .query(params)
                .get()
                .json<CounterpartyApiResponse>();

            if (response.success && response.counterparties) {
                return response.counterparties.map(counterparty => ({
                    id: counterparty.id || '',
                    companyId: counterparty.companyId || '',
                    accountNumber: counterparty.accountNumber || '',
                    routingNumber: counterparty.response?.data?.attributes?.routingNumber || '',
                    accountType: counterparty.response?.data?.attributes?.accountType || '',
                    accountName: counterparty.accountName || '',
                    accessToken: counterparty.accessToken || '',
                    asOf: counterparty.asOf || '',
                    byUser: counterparty.byUser || '',
                    createdAt: counterparty.createdAt || '',
                    type: counterparty.type || '',
                    ucCounterpartyId: counterparty.ucCounterpartyId || '',
                    ucCustomerId: counterparty.ucCustomerId || '',
                    version: counterparty.version || -1,
                    name: counterparty.accountName || '',
                }));
            }

            return null;
        } catch (error) {
            this.logger.error('Error calling Unit Co. Banking Counterparties', error);
            return null;
        }
    }

    // DEPOSIT
    async getBankingAccounts(companyId: string, options?: BankingParameters): Promise<DepositsResponse> {
        try {
            const params = this.bankingParams(options);

            const response = await this.client.url(`/banking/${companyId}/deposits/list`).query(params).get().json<DepositsResponse>();

            if (!response.success) {
                this.logger.error('While trying to get a banking deposit account, an unhandled exception was thrown', response.error);
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

            const response = await this.client.url(`/banking/${companyId}/deposits/history`).query(params).get().json<DepositBalanceResponse>();

            if (!response.success) {
                this.logger.error('While trying to get banking deposit balance history, an unhandled exception was thrown', response.error);
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
                this.logger.error('While trying to get banking deposit limits, an unhandled exception was thrown', response.error);
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
                this.logger.error('While trying to get banking Cards by Company, an unhandled exception occurred', response.error);
            }

            return response;
        } catch (error) {
            this.logger.error('While trying to get banking Cards by Company, an unhandled exception was thrown', error);
            return { success: false, error };
        }
    }

    async createBankingDebitCard(companyId: string, debitCardForm: CreateCardRequest): Promise<IssueCardResponse> {
        try {
            const response = await this.client.url(`/banking/${companyId}/cards`).post(debitCardForm).json<IssueCardResponse>();

            if (!response.success) {
                this.logger.error('While trying to create a Unit Co. Debit Card, an unhandled exception was thrown', response.error);
            }

            return response;
        } catch (error) {
            this.logger.error('While trying to create a Unit Co. Debit Card, an unhandled exception was thrown', error);
            return { success: false, error };
        }
    }

    async updateBankingDebitCard(companyId: string, debitCardForm: UpdateCardRequest): Promise<UpdateCardResponse> {
        try {
            const response = await this.client.url(`/banking/${companyId}/cards`).put(debitCardForm).json<UpdateCardResponse>();

            if (!response.success) {
                this.logger.error('While trying to update the Unit Co. Debit Card, an unhandled exception was thrown', response.error);
            }

            return response;
        } catch (error) {
            this.logger.error('While trying to update the Unit Co. Debit Card, an unhandled exception was thrown', error);
            return { success: false, error };
        }
    }

    async getPinStatus(companyId: string, cardId: string): Promise<GetPinStatusResponse> {
        try {
            const response = await this.client.url(`/banking/${companyId}/cards/${cardId}/pin`).get().json<GetPinStatusResponse>();

            if (!response.success) {
                this.logger.error('Unable to get the Banking Card PIN status. Please verify that the Card is active', response.error);
            }

            return response;
        } catch (error) {
            this.logger.error('While trying to get a Banking Card PIN status, an unhandled exception was thrown', error);
            return { success: false, error };
        }
    }

    async reportBankingDebitCard(companyId: string, request: ReportDebitCardRequest): Promise<UpdateCardResponse> {
        try {
            const response = await this.client.url(`/banking/${companyId}/cards/reportCard`).post(request).json<UpdateCardResponse>();

            if (!response.success) {
                this.logger.error('While trying to report a lost or stolen UnitCo Debit Card, an unhandled exception was thrown', response.error);
            }

            return response;
        } catch (error) {
            this.logger.error('While trying to report a lost or stolen UnitCo Debit Card, an unhandled exception was thrown', error);
            return { success: false, error };
        }
    }

    async freezeBankingDebitCard(companyId: string, cardId: string): Promise<UpdateCardResponse> {
        try {
            const response = await this.client
                .url(`/banking/${companyId}/cards/${cardId}/freeze`)
                .post({ status: 'freeze' })
                .json<UpdateCardResponse>();

            if (!response.success) {
                this.logger.error(
                    'While trying to update a Frozen UnitCo Banking Debit Card in the database, an error was encountered',
                    response.error
                );
            }

            return response;
        } catch (error) {
            this.logger.error('While trying to Freeze a UnitCo Debit Card, an unhandled exception was thrown', error);
            return { success: false, error };
        }
    }

    async unfreezeBankingDebitCard(companyId: string, cardId: string): Promise<UpdateCardResponse> {
        try {
            const response = await this.client
                .url(`/banking/${companyId}/cards/${cardId}/unfreeze`)
                .post({ status: 'unfreeze' })
                .json<UpdateCardResponse>();

            if (!response.success) {
                this.logger.error(
                    'While trying to update a Unfrozen UnitCo Banking Debit Card in the database, an error was encountered',
                    response.error
                );
            }

            return response;
        } catch (error) {
            this.logger.error('While trying to Unfreeze a UnitCo Debit Card, an unhandled exception was thrown', error);
            return { success: false, error };
        }
    }

    // UNITCO TOKEN
    async getUnitcoToken(): Promise<GetUnitcoTokenResponse> {
        try {
            const response = await this.client.url('/unitco/verifToken').get().json<GetUnitcoTokenResponse>();

            if (!response.success) {
                this.logger.error('While trying to create a new Customer Token Verification, an error occurred!', response.error);
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
                this.logger.error('While trying to create a new Customer Token, an error occurred!', response.error);
            }

            return response;
        } catch (error) {
            this.logger.error('While trying to create a new Customer Token, an error occurred!', error);
            return { success: false, error };
        }
    }
}
