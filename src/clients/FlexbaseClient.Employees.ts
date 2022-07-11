import { FlexbaseClientBase } from './FlexbaseClient.Base';
import { Employee } from '../models/Employees/Employee';

interface UserInfoPreview {
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
  address: string;
  city: string;
  state?: string;
  postalCode?: string;
  country?: string;
  id?: string;
}

export class FlexbaseClientEmployees extends FlexbaseClientBase {
  async getEmployees(): Promise<Employee[]> {
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
          street1: x.address,
          street2: null,
          city: x.city,
          state: x.state || '',
          postalCode: x.postalCode || '',
          country: x.country || '',
          id: x.id,
        };
      });
    } catch (error) {
      console.error('ALL USERS ERROR', error);
      return [];
    }
  }
}