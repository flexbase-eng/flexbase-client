import { FlexbaseResponse } from "../FlexbaseResponse";

export interface Payment extends FlexbaseResponse {
	id?: string,
	type?: string,
	asOf?: string,
	byUser?: string,
	companyId?: string,
	ucDepositId?: string,
	ucCustomerId?: string,
	payAmount?: string,
	payAmountCents?: string,
	payDescription?: string,
	payDirection?: string,
	payCtrParty?: string,
	createdAt?: string,
	status?: string,
}

export interface PaymentForm {
    type: string,
    amount: string,
    accountId: string,
    direction: string,
    counterparty: any,
    description: string,
}