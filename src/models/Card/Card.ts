/* eslint-disable no-unused-vars */
export enum Group {
  MaterialGroup = "MATERIALSUPPLIERS",
  ConvenienceStores = "CONVENIENCESTORES",
  FoodAndBeverage = "FOODANDBEVERAGE",
  Equipment = "EQUIPMENT",
  OfficeSupplies ="OFFICESUPPLIESANDCLEANING",
  FuelAndGas = "FUELANDGAS",
}

export interface Card {
  cardName: string;
  cardNumber: string;
  cardType: 'physical' | 'virtual';
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
