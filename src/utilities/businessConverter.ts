import { Company } from '../models/Business/Company';
import { Business } from '../models/Business/Business';

export const businessConverter = (company: Company): Business => {
    return {
        id: company.id,
        businessName: company.companyName || '',
        doingBusinessAs: company.doingBusinessAs,
        taxId: company.taxId || '',
        formationDate: company.formationDate || '',
        legalStructure: company.legalStructure || '',
        category: company.category || '',
        monthlyExpenditure: company.monthlyExpenditure || '',
        website: company.website,
        owners: [...(company.owners || [])],
        address: {
            street1: company.address?.line1 || '',
            street2: company.address?.line2 || null,
            city: company.address?.city || '',
            state: company.address?.state || '',
            postalCode: company.address?.postalCode || '',
            country: company.address?.country || '',
        },
        phone: {
            number: company.phone || '',
        },
    };
};
