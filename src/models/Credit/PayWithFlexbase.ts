import { Merchant } from '../Merchant/Merchant';
import { FlexbaseResponse } from '../FlexbaseResponse';

export type PayWithFlexbaseMode = 'immediate';

export interface PayWithFlexbase {
    apiKey: string;
    amount: number;
    session?: string;
    mode: PayWithFlexbaseMode;
    description?: string;
    bnplRequest: string;
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

// This isn't confusingly named at all
export interface RequestPayWithFlexbaseResponse extends FlexbaseResponse {
    id: string;
    amount: number;
    status: 'pending' | 'consumed';
}
