interface Relationship {
    data: {
      id: string;
      type: string;
    };
}

export interface Statement {
    id: string;
    type: "statement";
    attributes: {
        period: string;
    };
    relationships: {
        account: Relationship;
        customer?: Relationship;
        customers?: Relationship[];
    }
}
