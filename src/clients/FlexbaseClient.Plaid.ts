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
    async getPlaidLinkToken(): Promise<string | null> {
        try {
            const response = await this.client.url('/plaid/linktoken').get().json<LinkTokenResponse>();
            if (!response.success) return null;

            return response.response.link_token;
        } catch {
            //console.error('Unable to get plaid link token');
            return null;
        }
    }

    async exchangePlaidPublicToken(public_token: string, metadata: unknown): Promise<boolean> {
        try {
            const response = await this.client.url('/plaid/publicToken').post({ public_token, metadata }).json<PublicTokenExchangeResponse>();
            return response.success;
        } catch {
            //console.error('Unable to exchange plaid public token');
            return false;
        }
    }

    async updatePlaidLinkToken(): Promise<string | null> {
        try {
            const response = await this.client.url('/plaid/linktoken/update').get().json<LinkTokenResponse>();
            if (!response.success) return null;

            return response.response.link_token;
        } catch {
            //console.error('Unable to get plaid link token');
            return null;
        }
    }
}
