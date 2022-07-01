import { FlexbaseResponse } from '../models/FlexbaseResponse';
import { Underwriting } from '../models/Underwriting/Underwriting';
import { FlexbaseClientBase } from './FlexbaseClient.Base';

interface UnderwritingResponse extends Underwriting, FlexbaseResponse {}

export class FlexbaseClientUnderwriting extends FlexbaseClientBase {
    async requestLevel(companyId: string, level: 1 | 2): Promise<Underwriting | null> {
        if (!companyId) {
            throw new Error('companyId is required');
        }

        try {
            const response = await this.client.url(`/underwriting/updateLevel?id=${companyId}&level=${level}`).get().json<UnderwritingResponse>();

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
