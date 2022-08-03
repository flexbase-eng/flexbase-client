import { FlexbaseResponse } from '../models/FlexbaseResponse';
import { FlexbaseClientBase } from './FlexbaseClient.Base';


export class FlexbaseClientPassword extends FlexbaseClientBase {
    async changePassword(password: string): Promise<FlexbaseResponse> {
        try {
            const response = await this.client
                .url(`/auth/setPass`)
                .post({ password })
                .json<FlexbaseResponse>();

            if (!response.success) {
                this.logger.error(`Unable to change the password`, response.error);
            }

            return  response;
        } catch (error) {
            this.logger.error(`Unable to change the password`, error);
            return { success: false, error: 'Unable to change the password' };
        }
    }
}
