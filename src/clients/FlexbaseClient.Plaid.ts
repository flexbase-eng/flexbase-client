import { FlexbaseClientBase } from './FlexbaseClient.Base';

interface LinkTokenResponse {
    success: boolean;
    response: {
        expiration: string;
        link_token: string;
        request_id: string;
    };
}

interface PublicTokenExchangeResponse {
    success: boolean;
    response: {
        accessToken: string;
        accountId: string;
        itemId: string;
        userId: string;
    };
}

export class FlexbaseClientPlaid extends FlexbaseClientBase {
    /**
     * Request a Plaid `link_token` used to initialize [Plaid Link](https://plaid.com/docs/link/)
     * @returns A link token if successful, null otherwise
     */
    async getPlaidLinkToken(): Promise<string | null> {
        try {
            const response = await this.client.url('/plaid/linktoken').get().json<LinkTokenResponse>();
            if (!response.success) return null;

            return response.response.link_token;
        } catch {
            this.logger.error('Unable to get plaid link token');
            return null;
        }
    }

    /**
     * Exchange a Plaid `public_token`
     * @param public_token The public token issued by [Plaid Link](https://plaid.com/docs/link/)
     * @param metadata
     * @returns `true` if successful, otherwise `false`
     */
    async exchangePlaidPublicToken(public_token: string, metadata: unknown): Promise<boolean> {
        try {
            const response = await this.client.url('/plaid/publicToken').post({ public_token, metadata }).json<PublicTokenExchangeResponse>();
            return response.success;
        } catch {
            this.logger.error('Unable to exchange plaid public token');
            return false;
        }
    }

    /**
     * Update a Plaid `link_token` used by [Plaid Link](https://plaid.com/docs/link/). Used when re-authentication is required.
     * @returns A link token if successful, null otherwise
     */
    async updatePlaidLinkToken(): Promise<string | null> {
        try {
            const response = await this.client.url('/plaid/linktoken/update').get().json<LinkTokenResponse>();
            if (!response.success) return null;

            return response.response.link_token;
        } catch {
            this.logger.error('Unable to get plaid link token');
            return null;
        }
    }
}
