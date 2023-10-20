import { FlexbaseResponse } from '../models/FlexbaseResponse.js';
import { Underwriting } from '../models/Underwriting/Underwriting.js';
import { FlexbaseClientBase } from './FlexbaseClient.Base.js';

interface UnderwritingResponse extends Underwriting, FlexbaseResponse {}

export class FlexbaseClientUnderwriting extends FlexbaseClientBase {
  async requestLevel(level: 1 | 2, companyId?: string): Promise<Underwriting | null> {
    try {
      let url = `/underwriting/updateLevel?level=${level}`;

      if (companyId) {
        url = url + `&id=${companyId}`;
      }

      const response = await this.client.url(url).put().json<UnderwritingResponse>();

      if (!response.success) {
        this.logger.error(`Unable to underwrite company ${companyId}`);
        return null;
      }

      return {
        ...response,
      };
    } catch (error) {
      this.logger.error(`Unable to underwrite company ${companyId}`, error);
      return null;
    }
  }
}
