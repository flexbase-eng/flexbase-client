import { Person } from '../models/Person/Person';
import { User } from '../models/Person/User';

export const personConverter = (user: User): Person => {
    return {
        id: user.id,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        taxId: user.taxId || '',
        birthDate: user.birthDate || '',
        jobTitle: user.jobTitle || '',
        email: user.email,
        authorizedSignatory: user.authorizedSignatory || false,
        businessId: user.companyId,
        address: {
            street1: user.address?.line1 || '',
            street2: user.address?.line2 || null,
            city: user.address?.city || '',
            state: user.address?.state || '',
            postalCode: user.address?.postalCode || '',
            country: user.address?.country || '',
        },
        phone: {
            number: user.cellPhone || user.phone || '',
        },
        roles: user.roles || [],
    };
};
