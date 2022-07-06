import { FlexbaseClientBase } from './FlexbaseClient.Base';
import IEmployee from '../models/Company/Employee';

interface UserInfoPreview {
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
  id?: string;
}

export class FlexbaseClientCompany extends FlexbaseClientBase {
  async getCompanyUsers(): Promise<IEmployee[]> {
    try {
      const response = await this.client
        .url('/user')
        .get()
        .json<UserInfoPreview[]>();
      if (response.length === 0) {
        return [];
      }
      return response.map((x) => {
        return {
          firstName: x.firstName,
          lastName: x.lastName,
          jobTitle: x.jobTitle,
          email: x.email,
          phone: x.phone,
          id: x.id,
        };
      });
    } catch (error) {
      console.error('ALL USERS ERROR', error);
      return [];
    }
  }
}