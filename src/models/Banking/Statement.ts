import { Relationship } from "./Constants";

export interface Statement {
    id: string;
    type: string;
    attributes: {
        period: string;
    };
    relationships: {
        account: Relationship;
        customer?: Relationship;
        customers?: Relationship[];
    }
}
