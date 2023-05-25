/** @internal */
export interface Company {
  id: string;
  companyName?: string;
  doingBusinessAs?: string;
  taxId?: string;
  formationDate?: string;
  legalStructure?: string;
  category?: string;
  website?: string;
  monthlyExpenditure?: string;
  phone?: string;
  createdAt?: string;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  owners?: [
    {
      id: string;
    }
  ];
  financialInstitutions?: string[];
}
