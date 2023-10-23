import { DateTime } from 'luxon';
import { Business } from '../Business/Business.js';
import { Person } from '../Person/Person.js';

export interface OnboardingStatus {
  required: string[];
  completedTimestamp: DateTime;
  business: Business;
  person: Person;
}
