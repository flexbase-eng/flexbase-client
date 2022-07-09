import { Patron, PatronData } from '../models/Patron/Patron';
import { FlexbaseClientBase } from './FlexbaseClient.Base';

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

    async addOrUpdatePatron(patronData: PatronData): Promise<Patron | null> {
        try {
            return await this.client.url('/clients').post(patronData).json();
        } catch (error) {
            this.logger.error(`Unable to add or update patron`, error);
            return null;
        }
    }
}
