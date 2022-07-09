import { FlexbaseResponse } from '../models/FlexbaseResponse';
import { Underwriting } from '../models/Underwriting/Underwriting';
import { FlexbaseClientBase } from './FlexbaseClient.Base';

interface UnderwritingResponse extends Underwriting, FlexbaseResponse {}

export class FlexbaseClientUnderwriting extends FlexbaseClientBase {
    async requestLevel(level: 1 | 2, companyId?: string): Promise<Underwriting | null> {
        try {
            let url = `/underwriting/updateLevel?level=${level}`;

            if (companyId) {
                url = url + `&id=${companyId}`;
            }

            const response = await this.client.url(url).get().json<UnderwritingResponse>();

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
