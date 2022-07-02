import { Address } from '../models/Address/Address';
import { FlexbaseClientBase } from './FlexbaseClient.Base';

interface AddressPreview {
    address: string;
    city: string;
    state?: string;
    postalCode?: string;
    country?: string;
}

export class FlexbaseClientAddress extends FlexbaseClientBase {
    /**
     * Get address suggestions based on the specified street
     * @param street A partial street address
     * @returns An array of matched addresses, otherwise an empty array
     */
    async getAddressPreview(street: string | undefined): Promise<Address[]> {
        try {
            if (!street) {
                return [];
            }

            const response = await this.client.url('/address/preview').post({ address: street }).json<{ previews: AddressPreview[] }>();
            return response.previews.map(x => {
                return {
                    street1: x.address,
                    street2: null,
                    city: x.city,
                    state: x.state || '',
                    postalCode: x.postalCode || '',
                    country: x.country || '',
                };
            });
        } catch {
            this.logger.error('Unable to get address previews');
            return [];
        }
    }
}
