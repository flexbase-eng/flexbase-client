import jwtDecode from 'jwt-decode';
import { FlexbaseJwt } from '../models/auth/FlexbaseJwt.js';

export const decodeFlexbaseToken = (token: string) => {
  const decoded = jwtDecode.default<FlexbaseJwt>(token);
  return {
    email: decoded.email,
    companyId: decoded.companyId,
    id: decoded.id,
  };
};
