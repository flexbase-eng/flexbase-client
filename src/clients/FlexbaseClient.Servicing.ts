import { CreditStatement } from '../models/Servicing/servicing';
import { FlexbaseClientBase } from './FlexbaseClient.Base';

interface ServicingParameters {
    target?: string;
}

export class FlexbaseClientServicing extends FlexbaseClientBase {
    private servicingParams(options?: ServicingParameters) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const params: any = {};

        let property: keyof ServicingParameters;
        for (property in options) {
            if (options && Object.hasOwn(options, property)) {
                if (typeof options[property] === 'boolean') {
                    params[property] = true;
                } else {
                    params[property] = options[property];
                }
            }
        }

        return params;
    }

    async getCreditStatement(companyId: string,  options?: ServicingParameters): Promise<CreditStatement | null> {
        try {
            const params = this.servicingParams(options);
            const response = await this.client.url(`/servicing/statement/${companyId}`).query(params).get().json<CreditStatement>();
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
