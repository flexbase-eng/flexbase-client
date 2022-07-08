import { applyMixins } from '../utilities/mixin';
import { FlexbaseClientAddress } from './FlexbaseClient.Address';
import { FlexbaseClientBase } from './FlexbaseClient.Base';
import { FlexbaseClientInvoice } from './FlexbaseClient.Invoice';
import { FlexbaseClientPlaid } from './FlexbaseClient.Plaid';
import { FlexbaseClientPerson } from './FlexbaseClient.Person';
import { FlexbaseClientMerchant } from './FlexbaseClient.Merchant';
import { FlexbaseClientCredit } from './FlexbaseClient.Credit';
import { FlexbaseClientUnderwriting } from './FlexbaseClient.Underwriting';
import { FlexbaseClientPatron } from './FlexbaseClient.Patron';
import { FlexbaseClientProject } from './FlexbaseClient.Project';
import { FlexbaseClientDoc } from './FlexbaseClient.Doc';
import { FlexbaseClientCard } from './FlexbaseClient.Card';

export class FlexbaseClient extends FlexbaseClientBase {}

export interface FlexbaseClient
    extends FlexbaseClientAddress,
        FlexbaseClientPlaid,
        FlexbaseClientInvoice,
        FlexbaseClientPerson,
        FlexbaseClientMerchant,
        FlexbaseClientCredit,
        FlexbaseClientUnderwriting,
        FlexbaseClientProject,
        FlexbaseClientDoc,
        FlexbaseClientCard,
        FlexbaseClientPatron {}

applyMixins(FlexbaseClient, [
    FlexbaseClientAddress,
    FlexbaseClientPlaid,
    FlexbaseClientInvoice,
    FlexbaseClientPerson,
    FlexbaseClientMerchant,
    FlexbaseClientCredit,
    FlexbaseClientUnderwriting,
    FlexbaseClientProject,
    FlexbaseClientDoc,
    FlexbaseClientCard,
    FlexbaseClientPatron,
]);
