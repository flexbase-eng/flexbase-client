import { PasswordCredentials } from '@flexbase/http-client-middleware';

export class FlexbasePasswordCredentials extends PasswordCredentials {
  code: string = '';
}
