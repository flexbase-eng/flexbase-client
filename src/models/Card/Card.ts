export enum Group {
  "MATERIALSUPPLIERS",
  "CONVENIENCESTORES",
  "FOODANDBEVERAGE",
  "EQUIPMENT",
  "OFFICESUPPLIESANDCLEANING",
  "FUELANDGAS",
}

export interface Card {
  cardName: string;
  cardNumber: string;
  cardType: 'phisycal' | 'virtual';
  companyId: string;
  creditLimit: null;
  expensesTypes: {
    amount: number,
    groups: Group[],
  };
  expirationDate: string;
  holder: string;
  id: string;
  notifyUse: boolean;
  status: string;
  userId: string;
}
