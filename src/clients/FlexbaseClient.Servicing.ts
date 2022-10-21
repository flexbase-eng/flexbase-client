import { StatementCredit } from '../models/Servicing/servicing';
import { FlexbaseClientBase } from './FlexbaseClient.Base';

export class FlexbaseClientServicing extends FlexbaseClientBase {
    async getCreditStatement(companyId: string, target?: string): Promise<StatementCredit | null> {
        try {
            const response = await this.client.url(`/servicing/statement/${companyId}?target=${target}`).get().json<StatementCredit>();
            if(!response.success) {
                this.logger.error('Unable to get credit statement data', response);
            }
            return response;
        } catch (error) {
            this.logger.error(`Unable to get credit statement data`, error);
            return { success: false, error: 'Unable to get credit statement data' };
        }
    }
}