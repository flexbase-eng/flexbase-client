/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Card {
    cardName: string;
    cardNumber: string;
    cardType: 'phisycal' | 'virtual';
    companyId: string;
    creditLimit: null;
    expensesTypes: any;
    expirationDate: string;
    holder: string;
    id: string;
    notifyUse: boolean;
    status: string;
    userId: string;
  }
