import { applyMixins } from '../utilities/mixin';
import { FlexbaseClientAddress } from './FlexbaseClient.Address';
import { FlexbaseClientBase } from './FlexbaseClient.Base';
import { FlexbaseClientInvoice } from './FlexbaseClient.Invoice';
import { FlexbaseClientPlaid } from './FlexbaseClient.Plaid';
import { FlexbaseClientPerson } from './FlexbaseClient.Person';

export class FlexbaseClient extends FlexbaseClientBase {}

export interface FlexbaseClient extends FlexbaseClientAddress, FlexbaseClientPlaid, FlexbaseClientInvoice, FlexbaseClientPerson {}

applyMixins(FlexbaseClient, [FlexbaseClientAddress, FlexbaseClientPlaid, FlexbaseClientInvoice, FlexbaseClientPerson]);
