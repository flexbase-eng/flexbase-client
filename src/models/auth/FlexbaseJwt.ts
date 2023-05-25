import { JwtPayload } from 'jwt-decode';

export interface FlexbaseJwt extends JwtPayload {
  email: string;
  companyId: string;
  id: string;
  roles?: string[];
}
