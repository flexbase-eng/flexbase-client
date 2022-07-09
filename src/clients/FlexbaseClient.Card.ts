/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from '../models/Card/Card';
import { Address } from '../models/Address/Address';
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

interface UpdateCardForm {
    expensesTypes: {
        amount: number,
        groups: any,
    };
    notifyUse: boolean;
    shipTo?: Address,
    creditLimit: number,
    cardName?: string,
}

export class FlexbaseClientCard extends FlexbaseClientBase {
    private params({ searchTerm, status }: QueryParameters = {}) {
        const params: any = {};

        if (typeof searchTerm === 'string') {
            params.searchTerm = searchTerm;
          }
      
          if (typeof status === 'string') {
            params.status = status;
          }

        return params;
    }

    async getCardsByCompany({ searchTerm, status }: QueryParameters = {}): Promise<Card[] | null> {
        try {
          const params = this.params({ searchTerm, status });
    
          const response = await this.client.url('/card/company').query(params).get().json<CardsResponse>();

           if (!response.success) {
              this.logger.error('Unable to get company cards', response.error);
              return null;
           }
    
          return response.cards;
        } catch (error) {
          this.logger.error('Unable to get company cards', error);
          return null;
        }
    }

    async getCardById(cardId: string): Promise<Card | null> {
        try {    
          const response = await this.client.url(`/card/${cardId}`).get().json<CardResponse>();

           if (!response.success) {
              this.logger.error(`Unable to get the card info for ${cardId}`);
              return null;
           }
    
          return response.card;
        } catch (error) {
          this.logger.error('Unable to get user card', error);
          return null;
        }
    }

    async issueCard(userId: string, cardType: 'physical' | 'virtual', shipTo?: Address, service?: string): Promise<Card | null> {
        try {
           const response = await this.client.url(`/card/${userId}/issue`).post({ cardType, shipTo, service}).json<CardResponse>();

           if (!response.success) {
              this.logger.error('Unable to issue the card', response.error);
              return null;
           }

          return response.card
        } catch (error) {
          this.logger.error('Unable to issue card', error);
          return null;
        }
    }

    async updateCard(cardId: string, formData: UpdateCardForm): Promise<Card | null> {
        try {
           const response = await this.client.url(`/card/${cardId}`).put(formData).json<CardResponse>();

           if (!response.success) {
              this.logger.error(`Unable to update the card info for ${cardId}`);
              return null;
           }

          return response.card
        } catch (error) {
          this.logger.error('Unable to update card info', error);
          return null;
        }
    }
}
