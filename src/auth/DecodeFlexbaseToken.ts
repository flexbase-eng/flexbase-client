import { FlexbaseJwt } from '../models/auth/FlexbaseJwt.js';
import { jwtDecode } from '../utilities/jwt.decode.js';

export const decodeFlexbaseToken = (token: string) => {
  const decoded = jwtDecode<FlexbaseJwt>(token);
  return {
    email: decoded.email,
    companyId: decoded.companyId,
    id: decoded.id,
  };
};
