import { JwtPayload } from '../../utilities/jwt.decode.js';

export interface FlexbaseJwt extends JwtPayload {
  email: string;
  companyId: string;
  id: string;
  roles?: string[];
}
