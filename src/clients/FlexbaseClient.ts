/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

import { applyMixins } from '../utilities/mixin.js';
import { FlexbaseClientAddress } from './FlexbaseClient.Address.js';
import { FlexbaseClientBase } from './FlexbaseClient.Base.js';
import { FlexbaseClientInvoice } from './FlexbaseClient.Invoice.js';
import { FlexbaseClientPlaid } from './FlexbaseClient.Plaid.js';
import { FlexbaseClientPerson } from './FlexbaseClient.Person.js';
import { FlexbaseClientMerchant } from './FlexbaseClient.Merchant.js';
import { FlexbaseClientCredit } from './FlexbaseClient.Credit.js';
import { FlexbaseClientUnderwriting } from './FlexbaseClient.Underwriting.js';
import { FlexbaseClientPatron } from './FlexbaseClient.Patron.js';
import { FlexbaseClientOnboarding } from './FlexbaseClient.Onboarding.js';
import { FlexbaseClientProject } from './FlexbaseClient.Project.js';
import { FlexbaseClientDoc } from './FlexbaseClient.Doc.js';
import { FlexbaseClientCard } from './FlexbaseClient.Card.js';
import { FlexbaseClientCompany } from './FlexbaseClient.Company.js';
import { FlexbaseClientPassword } from './FlexbaseClient.Password.js';
import { FlexbaseClientBanking } from './FlexbaseClient.Banking.js';
import { FlexbaseClientServicing } from './FlexbaseClient.Servicing.js';

export class FlexbaseClient extends FlexbaseClientBase {}

export interface FlexbaseClient
  extends FlexbaseClientAddress,
    FlexbaseClientPlaid,
    FlexbaseClientInvoice,
    FlexbaseClientPerson,
    FlexbaseClientMerchant,
    FlexbaseClientCredit,
    FlexbaseClientUnderwriting,
    FlexbaseClientPatron,
    FlexbaseClientOnboarding,
    FlexbaseClientProject,
    FlexbaseClientDoc,
    FlexbaseClientCard,
    FlexbaseClientCompany,
    FlexbaseClientPassword,
    FlexbaseClientBanking,
    FlexbaseClientServicing,
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
  FlexbaseClientOnboarding,
  FlexbaseClientCompany,
  FlexbaseClientPassword,
  FlexbaseClientBanking,
  FlexbaseClientServicing,
]);
