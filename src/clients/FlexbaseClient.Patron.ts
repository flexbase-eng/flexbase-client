import { Patron } from '../models/Patron/Patron';
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
}