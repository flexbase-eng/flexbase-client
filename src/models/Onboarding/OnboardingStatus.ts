import { DateTime } from 'luxon';
import { Business } from '../Business/Business';
import { Person } from '../Person/Person';

export interface OnboardingStatus {
    required: string[];
    completedTimestamp: DateTime;
    business: Business;
    person: Person;
}
