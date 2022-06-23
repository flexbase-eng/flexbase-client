import { Address } from '../models/Address';
import { FlexbaseClientBase } from './FlexbaseClient.Base';

interface AddressPreview {
    address: string;
    city: string;
    state?: string;
    postalCode?: string;
    country?: string;
}

export class FlexbaseClientAddress extends FlexbaseClientBase {
    async addressPreview(street1: string | undefined): Promise<Address[]> {
        try {
            if (!street1) {
                return [];
            }

            const response = await this.client.url('/address/preview').post({ address: street1 }).json<{ previews: AddressPreview[] }>();
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
            // console.error('Unable to get address previews');
            return [];
        }
    }
}
