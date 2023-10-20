import { DateTime } from 'luxon';
import { User } from '../models/Person/User.js';
import { businessConverter } from '../utilities/businessConverter.js';
import { Company } from '../models/Business/Company.js';
import { FlexbaseResponse } from '../models/FlexbaseResponse.js';
import { OnboardingStatus } from '../models/Onboarding/OnboardingStatus.js';
import { FlexbaseClientBase } from './FlexbaseClient.Base.js';
import { personConverter } from '../utilities/personConverter.js';

interface OnboardingStatusResponse extends FlexbaseResponse {
  required: string[];
  user: User;
  company: Company;
  completedOnboarding: string;
}

export class FlexbaseClientOnboarding extends FlexbaseClientBase {
  async getOnboardingStatus(expand?: boolean): Promise<OnboardingStatus | null> {
    try {
      let url = '/onboarding';
      if (expand) {
        url = url + `?full=${expand}`;
      }

      const response = await this.client.url(url).get().json<OnboardingStatusResponse>();

      if (!response.success) {
        this.logger.error('Unable to get onboarding status', response.error);
        return null;
      }

      return {
        completedTimestamp: DateTime.fromISO(response.completedOnboarding),
        required: response.required,
        business: businessConverter(response.company),
        person: personConverter(response.user),
      };
    } catch (error) {
      this.logger.error('Unable to get onboarding status', error);
      return null;
    }
  }
}
