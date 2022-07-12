import { Card, Group } from '../models/Card/Card';
import { Address } from '../models/Address/Address';
import { FlexbaseClientBase } from './FlexbaseClient.Base';
import { FlexbaseResponse } from '../models/FlexbaseResponse';

interface QueryParameters {
  searchTerm?: string;
  status?: string;
  full?: boolean;
}

interface CardsResponse extends FlexbaseResponse{
  cards: Card[];
}

interface CardResponse extends FlexbaseResponse{
  card: Card | null;
}

interface UpdateCardForm {
  expensesTypes: {
    amount: number,
    groups: Group[],
  };
  notifyUse: boolean;
  shipTo?: Address,
  creditLimit: number,
  cardName?: string,
}


export class FlexbaseClientCard extends FlexbaseClientBase {
    private params({ searchTerm, status, full }: QueryParameters = {}) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const params: any = {};

        if (typeof searchTerm !== null) {
          params.searchTerm = searchTerm;
        }
      
        if (typeof status !== null) {
          params.status = status;
        }

        if (full) {
          params.full = true
        }

      return params;
    }

    async getCardsByCompany({ searchTerm, status, full }: QueryParameters = {}): Promise<CardsResponse> {
      try {
        const params = this.params({ searchTerm, status, full });
    
        const response = await this.client.url('/card/company').query(params).get().json<CardsResponse>();

        if (!response.success) {
          this.logger.error('Unable to get company cards', response.error);
          return response;
        }
    
        return response;
      } catch (error) {
        this.logger.error('Unable to get company cards', error);
        return { success: false, error: 'Unable to get company cards', cards: [] };
      }
    }

    async getCard(cardId: string, full?: boolean): Promise<CardResponse> {
      try {
        const params = this.params({ full });

        const response = await this.client.url(`/card/${cardId}`).query(params).get().json<CardResponse>();

        if (!response.success) {
          this.logger.error(`Unable to get the card info for ${cardId}`);
          return response;
        }
    
        return response;
      } catch (error) {
        this.logger.error('Unable to get user card', error);
        return { success: false, error: 'Unable to get the card info', card: null };
      }
    }

    async issueCard(userId: string, cardType: 'physical' | 'virtual', shipTo?: Address, service?: string): Promise<CardResponse> {
      try {
        const response = await this.client.url(`/card/${userId}/issue`).post({ cardType, shipTo, service }).json<CardResponse>();

        if (!response.success) {
          this.logger.error('Unable to issue the card', response.error);
          return response;
        }

        return response
      } catch (error) {
        this.logger.error('Unable to issue card', error);
        return { success: false, error: 'Unable to issue the card', card: null };
      }
    }

    async updateCard(cardId: string, formData: UpdateCardForm): Promise<CardResponse> {
      try {
        const response = await this.client.url(`/card/${cardId}`).put(formData).json<CardResponse>();

        if (!response.success) {
          this.logger.error(`Unable to update the card info for ${cardId}`);
          return response;
        }

        return response
      } catch (error) {
        this.logger.error('Unable to update the card info', error);
        return { success: false, error: 'Unable to update the card info', card: null };
      }
    }
}
