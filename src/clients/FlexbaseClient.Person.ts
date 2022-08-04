import { Person } from '../models/Person/Person';
import { FlexbaseResponse } from '../models/FlexbaseResponse';
import { PersonUpdate } from '../models/Person/PersonUpdate';
import { FlexbaseClientBase } from './FlexbaseClient.Base';

interface PersonUpdateRequest {
    firstName?: string;
    lastName?: string;
    taxId?: string;
    birthDate?: string;
    jobTitle?: string;
    email?: string;
    address?: string;
    addressLine2?: string | null;
    city?: string;
    country?: string;
    state?: string;
    postalCode?: string;
    cellPhone?: string;
    authorizedSignatory?: boolean;
    id?: string;
}


interface PersonResponse extends FlexbaseResponse {
    usr?: Person | null;
}


export class FlexbaseClientPerson extends FlexbaseClientBase {  
    async getEmployees(): Promise<PersonUpdateRequest[]> {
        try {
          return await this.client
          .url('/user')
          .get()
          .json();

        } catch (error) {
            this.logger.error('ALL USERS ERROR', error);
          return [];
        }
      }

    async getPerson(userId: string): Promise<PersonResponse> {
        if (!userId) {
            throw new Error('userId is required');
        }

        try {
            const response = await this.client.url(`/user/${userId}`).get().json<Person>();

            if (!response) {
                this.logger.error(`Unable to get person ${userId}`, response);
            }

            return { usr: response, success: true };
        } catch (error) {
            this.logger.error(`Unable to get person ${userId}`, error);
            return { success: false, error: `Unable to get person ${userId}` }
        }
    }

    async addPerson(userForm: PersonUpdateRequest): Promise<Person | null> {
        try {
          const result = await this.client
            .url('/onboarding/user')
            .post(userForm)
            .json();
          return result.newUser;
        } catch (error) {
            this.logger.error('SAVE USER ERROR', error);
          return null;
        }
      }

    async updatePerson(userId: string, person: PersonUpdate): Promise<PersonUpdateRequest | null> {
        if (!userId) {
            throw new Error('userId is required');
        }

        try {
            const request: PersonUpdateRequest = {
                firstName: person.firstName,
                lastName: person.lastName,
                taxId: person.taxId,
                birthDate: person.birthDate,
                jobTitle: person.jobTitle,
                email: person.email,
                address: person.address?.street1,
                addressLine2: person.address?.street2,
                city: person.address?.city,
                country: person.address?.country,
                postalCode: person.address?.postalCode,
                cellPhone: person.phone?.number,
                authorizedSignatory: person.authorizedSignatory,
            };

            const response = await this.client.url(`/user/${userId}`).put(request).json();

            if (!response) {
                this.logger.error(`Unable to update person ${userId}`, response);
            }

            return response;
        } catch (error) {
            this.logger.error(`Unable to update person ${userId}`, error);
            return null ;
        }
    }

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    async updatePersonPicture(userId: string, picture: any): Promise<boolean> {
        if (!userId) {
            throw new Error('userId is required');
        }

        try {
            const response = await this.client.url(`/user/${userId}/profilePic`).formData({ file: picture }).post().json<FlexbaseResponse>();

            if (response.error) {
                this.logger.error(`Unable to update person picture ${userId}`, response);
            }

            return response.success;
        } catch (error) {
            this.logger.error(`Unable to update person picture ${userId}`, error);
            return false;
        }
    }

    async getPersonPicture(userId: string): Promise<ArrayBuffer | null> {
        if (!userId) {
            throw new Error('userId is required');
        }

        try {
            return await this.client.url(`/user/${userId}/profilePic`).get().arrayBuffer();
        } catch (error) {
            this.logger.error(`Unable to get person picture ${userId}`, error);
            return null;
        }
    }
}
