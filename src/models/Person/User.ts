/** @internal */
export interface User {
    id: string;
    firstName?: string;
    lastName?: string;
    taxId?: string;
    birthDate?: string;
    jobTitle?: string;
    email: string;
    phone?: string;
    cellPhone?: string;
    address?: {
        line1?: string;
        line2?: string;
        city?: string;
        state?: string;
        postalCode?: string;
        country?: string;
    };
    authorizedSignatory?: boolean;
    roles?: string[];
    status?: string;
    companyId: string;
    plaidLinked: boolean;
    termsOfServiceSigned: boolean;
    tenantId: string;
}
