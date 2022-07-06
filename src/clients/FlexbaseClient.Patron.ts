import { Patron } from '../models/Patron/Patron';
import { FlexbaseClientBase } from './FlexbaseClient.Base';

interface IPatronData {
    id?: string;
    name?: string;
    address?: string;
    state?: string;
    city?: string;
    postalCode?: string;
  }

interface IResponseUpdatePatron {
    patron?: Patron;
    success: boolean;
    message?: string;
  }

export class FlexbaseClientPatron extends FlexbaseClientBase {
    async getPatrons(patronId?: string): Promise<Patron[]> {
        try {
            let url = '/clients';

            if (patronId) {
                url = url + `/${patronId}`;
            }

            return await this.client.url(url).get().json<Patron[]>();
        } catch (error) {
            this.logger.error('Unable to get patrons', error);
            return [];
        }
    }

    async addPatron(patronData: IPatronData): Promise<IResponseUpdatePatron> {
        try {
          const response = await this.client
            .url('/clients')
            .post(patronData)
            .json();
    
          return {
            patron: {
              id: response.id,
              name: response.name,
              companyId: response.companyId,
              tenantId: response.tenantId,
              address: {
                street1: response.address,
                city: response.city,
                country: response.country,
                state: response.state,
                postalCode: response.postalCode,
              }
            },
            success: true,
            message: 'You have a new patron!',
          };
        } catch (error) {
            this.logger.error(`Unable to add patron`, error);
            return { success: false, message: 'Unable to add patron' }
        }
      }

    async updatePatron(patronData: IPatronData): Promise<IResponseUpdatePatron> {
        try {
          if (patronData?.id) {
            const response = await this.client
              .url('/clients')
              .post(patronData)
              .json();
    
            return {
              patron: {
                id: response.id,
                name: response.name,
                companyId: response.companyId,
                tenantId: response.tenantId,
                address: {
                    street1: response.address,
                    city: response.city,
                    country: response.country,
                    state: response.state,
                    postalCode: response.postalCode,
                }
              },
              success: true,
              message: 'The information has been updated!',
            };
          }
          return { success: false, message: 'Unable to update client data' };
        } catch (error) {
          this.logger.error(`Unable to update patron`, error);
          return { success: false, message: 'Unable to update patron' }
        }
      }

}
