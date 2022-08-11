import { CounterpartyForm } from "./Counterparty";
import { FlexbaseResponse } from "../FlexbaseResponse";

export interface Payment extends FlexbaseResponse {
	id?: string,
	asOf?: string,
	byUser?: string,
	companyId?: string,
	createdAt?: string,
	payAmount?: string,
	payAmountCents?: string,
	payDescription?: string,
	payDirection?: string,
	payCtrParty?: string,
	status?: string,
	type?: string,
	ucCustomerId?: string,
	ucDepositId?: string,
	version?: number,
}

export interface PaymentRequest {
    type: string,
    amount: string,
    direction: string,
    description: string,
    counterparty: CounterpartyForm,
}