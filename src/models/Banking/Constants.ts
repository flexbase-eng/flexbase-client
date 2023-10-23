export interface Relationship {
  data: {
    id: string;
    type: string;
  };
}

export interface Address {
  city: string;
  state: string;
  street: string;
  street2?: string;
  country: string;
  postalCode: string;
}

export interface FullName {
  first: string;
  last: string;
}

export interface Phone {
  countryCode: string;
  number: string;
}
