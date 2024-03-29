import { FlexbaseResponse } from '../models/FlexbaseResponse.js';
import { Merchant } from '../models/Merchant/Merchant.js';
import { FlexbaseClientBase } from './FlexbaseClient.Base.js';

interface MerchantResponse extends FlexbaseResponse {
  merchant: Merchant;
}

export class FlexbaseClientMerchant extends FlexbaseClientBase {
  async getMerchant(apiKey: string): Promise<Merchant | null> {
    if (!apiKey) {
      throw new Error('apiKey is required');
    }

    try {
      const response = await this.client
        .url(`/credit/merchant/${apiKey}`)
        .options({ authContext: { isAnonymousRoute: true } }, true)
        .get()
        .json<MerchantResponse>();

      if (!response.success) {
        this.logger.error(`Unable to get merchant ${apiKey}`, response.error);
        return null;
      }

      return response.merchant;
    } catch (error) {
      this.logger.error(`Unable to get merchant ${apiKey}`, error);
      return null;
    }
  }
}
