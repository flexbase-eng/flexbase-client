import { Merchant } from '../Merchant/Merchant';

export type PayWithFlexbaseMode = 'immediate';

export interface PayWithFlexbase {
    apiKey: string;
    amount: number;
    session?: string;
    mode: PayWithFlexbaseMode;
    description?: string;
}

export interface PayWithFlexbaseResponse {
    approved: boolean;
    invoice?: PayWithFlexbaseInvoice;
    merchant?: Merchant;
}

export interface PayWithFlexbaseInvoice {
    id: string;
    amount: number;
    status: string;
    session: string;
}
