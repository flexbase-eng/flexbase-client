import { Patron } from '../models/Patron/Patron';
import { FlexbaseClientBase } from './FlexbaseClient.Base';

interface PatronData {
    id?: string;
    name?: string;
    address?: string;
    state?: string;
    city?: string;
    postalCode?: string;
  }

  interface ResponsePatron {
    id?: string;
    name?: string;
    companyId: string;
    imageUrl: string;
    tenantId: string;
    address?: string;
    state?: string;
    city?: string;
    country?: string;
    postalCode?: string;
  }

export class FlexbaseClientPatron extends FlexbaseClientBase {
    async getPatrons(patronId?: string): Promise<Patron[]> {
        try {
            let url = '/clients';

            if (patronId) {
                url = url + `/${patronId}`;
            }

            const response = await this.client.url(url).get().json();

            return response.map((x: ResponsePatron) => {
                return {
                    id: x.id,
                    name: x.name,
                    companyId: x.companyId,
                    imageUrl: x.imageUrl,
                    tenantId: x.tenantId,
                    address: {
                       street1: x.address,
                       city: x.city,
                       country: x.country,
                       state: x.state,
                       postalCode: x.postalCode,
                    }
                };
            });
        } catch (error) {
            this.logger.error('Unable to get patrons', error);
            return [];
        }
    }

    async addOrUpdatePatron(patronData: PatronData): Promise<Patron | null> {
        try {
          const response = await this.client
            .url('/clients')
            .post(patronData)
            .json();

            return {
                id: response.id,
                name: response.name,
                companyId: response.companyId,
                imageUrl: response.imageUrl,
                tenantId: response.tenantId,
                address: {
                   street1: response.address,
                   city: response.city,
                   country: response.country,
                   state: response.state,
                   postalCode: response.postalCode,
                }
            };
  
        } catch (error) {
            this.logger.error(`Unable to add or update patron`, error);
            return null;
        }
      }
}
