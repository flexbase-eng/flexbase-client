import { FlexbaseResponse } from '../models/FlexbaseResponse';
import { FlexbaseClientBase } from './FlexbaseClient.Base';

interface ChangePasswordResponse extends FlexbaseResponse {
    success: boolean;
    error?: string;
}

export class FlexbaseClientPassword extends FlexbaseClientBase {
    async changePassword(password: string | null): Promise<ChangePasswordResponse> {
        try {
            const response = await this.client
                .url(`/auth/setPass`)
                .post({ password })
                .json();

            if (!response.success) {
                this.logger.error(`Unable to change the password`, response.error);
                return { success: false, error: 'Unable to change the password'};
            }

            return { success: true };
        } catch (error) {
            this.logger.error(`Unable to change the password`, error);
            return { success: false, error: 'Unable to change the password' };
        }
    }
}
