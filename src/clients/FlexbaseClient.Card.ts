/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from '../models/Card/Card';
import { CardOptions } from '../models/Card/CardOptions';
import { FlexbaseClientBase } from './FlexbaseClient.Base';
import { FlexbaseResponse } from '../models/FlexbaseResponse';

interface CardsResponse extends FlexbaseResponse{
    cards: Card[];
}

interface QueryParameters {
    searchTerm?: string;
    status?: string;
}

export class FlexbaseClientCard extends FlexbaseClientBase {
    private params({ searchTerm, status }: CardOptions = {}) {
        const params: any = {};

        if (typeof searchTerm === 'string') {
            params.searchTerm = searchTerm;
          }
      
          if (typeof status === 'string') {
            params.status = status;
          }

        return params;
    }

    async getCompanyCards({ searchTerm, status }: QueryParameters = {}): Promise<Card[] | null> {
        try {
          const params = this.params({ searchTerm, status });
    
          const response = await this.client.url('/card/company').query(params).get().json<CardsResponse>();

           if (!response.success) {
              return null;
           }
    
          return response.cards;
        } catch (error) {
          console.error('Unable to get company cards', error);
          return null;
        }
      }
}
