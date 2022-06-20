import { applyMixins } from '../utilities/mixin';
import { FlexbaseClientAddress } from './FlexbaseClient.Address';
import { FlexbaseClientBase } from './FlexbaseClient.Base';
import { FlexbaseClientPlaid } from './FlexbaseClient.Plaid';

export class FlexbaseClient extends FlexbaseClientBase {}

export interface FlexbaseClient extends FlexbaseClientAddress, FlexbaseClientPlaid {}

applyMixins(FlexbaseClient, [FlexbaseClientAddress, FlexbaseClientPlaid]);
