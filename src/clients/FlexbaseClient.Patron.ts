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

    async addPatron(patronData: PatronData): Promise<Patron | null> {
        try {
          return await this.client
            .url('/clients')
            .post(patronData)
            .json<Patron>();

  
        } catch (error) {
            this.logger.error(`Unable to add patron`, error);
            return null;
        }
      }
}
