import { RelationshipData } from "./Constants";

export interface Statement {
    id: string;
    type: string;
    attributes: {
        period: string;
    };
    relationships: {
        account: RelationshipData;
        customer?: RelationshipData;
        customers?: RelationshipData[];
    }
}
