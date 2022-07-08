/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from '../models/Card/Card';
import { Address } from '../models/Address/Address';
import { CardOptions } from '../models/Card/CardOptions';
import { FlexbaseClientBase } from './FlexbaseClient.Base';
import { FlexbaseResponse } from '../models/FlexbaseResponse';

interface QueryParameters {
    searchTerm?: string;
    status?: string;
}

interface CardsResponse extends FlexbaseResponse{
    cards: Card[];
}

interface CardResponse extends FlexbaseResponse{
    card: Card;
}

interface IssueCardForm {
    cardType: string,
    shipTo?: Address,
    service?: string,
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
          this.logger.error('Unable to get company cards', error);
          return null;
        }
    }

    async getUserCard(userId: string): Promise<Card | null> {
        try {    
          const response = await this.client.url(`/card/${userId}`).get().json<CardResponse>();

           if (!response.success) {
              return null;
           }
    
          return response.card;
        } catch (error) {
          this.logger.error('Unable to get user card', error);
          return null;
        }
    }

    async issueUserCard(userId: string, formData: IssueCardForm): Promise<Card | null> {
        try {
           const response = await this.client.url(`/card/${userId}/issue`).post(formData).json<CardResponse>();

           if (!response.success) {
              return null;
           }

          return response.card
        } catch (error) {
          this.logger.error('Unable to issue card', error);
          return null;
        }
    }
}
