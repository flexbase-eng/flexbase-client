import { Card, CardHiddenInfo, Group, EmbedUrlHiddenInfo } from '../models/Card/Card.js';
import { Address } from '../models/Address/Address.js';
import { FlexbaseClientBase } from './FlexbaseClient.Base.js';
import { FlexbaseResponse } from '../models/FlexbaseResponse.js';
import { Limits } from '../models/Banking/Cards.js';

interface QueryParameters {
  searchTerm?: string;
  status?: string;
  full?: boolean;
}

interface CardsResponse extends FlexbaseResponse {
  cards: Card[];
}

interface CardResponse extends FlexbaseResponse {
  card: Card | null;
}

interface UpdateCardForm {
  expensesTypes: {
    amount: number | null;
    groups: Group[];
    interval: string | null;
  };
  notifyUse: boolean;
  shipTo?: Address;
  creditLimit: number | null;
  cardName?: string;
}

interface CardForm {
  cardType: string;
  shipTo?: Address;
  service?: string;
  limits?: Limits;
}

export class FlexbaseClientCard extends FlexbaseClientBase {
  private params({ searchTerm, status, full }: QueryParameters = {}) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any = {};

    if (searchTerm) {
      params.searchTerm = searchTerm;
    }

    if (status) {
      params.status = status;
    }

    if (full) {
      params.full = true;
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

  async issueCard(userId: string, form: CardForm): Promise<CardResponse> {
    try {
      const response = await this.client.url(`/card/${userId}/issue`).post(form).json<CardResponse>();

      if (!response.success) {
        this.logger.error('Unable to issue the card', response.error);
        return response;
      }

      return response;
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

      return response;
    } catch (error) {
      this.logger.error('Unable to update the card info', error);
      return { success: false, error: 'Unable to update the card info', card: null };
    }
  }

  async updateCardStatus(cardId: string, status: 'active' | 'suspended' | 'terminated', last4?: string): Promise<CardResponse> {
    try {
      const response = await this.client.url('/card/status').put({ cardId, status, last4 }).json<CardResponse>();

      if (!response.success) {
        this.logger.error('Unable to update the card status', response.error);
      }

      return response;
    } catch (error) {
      this.logger.error('Unable to update the card status', error);
      return { success: false, error: 'Unable to update the card status', card: null };
    }
  }

  async getCardHiddenInfo(cardId: string): Promise<CardHiddenInfo | EmbedUrlHiddenInfo> {
    try {
      const response = await this.client.url(`/card/${cardId}/hiddenInfo`).get().json<CardHiddenInfo | EmbedUrlHiddenInfo>();

      if (!response.success) {
        this.logger.error(`Unable to obtain hidden card information for ${cardId}`);
        return response;
      }

      return response;
    } catch (error) {
      this.logger.error('Unable to get user card', error);
      return {
        cardNumber: null,
        cvc: null,
        embedUrl: null,
        expirationDate: null,
        last4: null,
        success: false,
        error: 'Unable to obtain hidden card information',
      };
    }
  }
}
