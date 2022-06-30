import jwt_decode from 'jwt-decode';
import { FlexbaseJwt } from '../models/auth/FlexbaseJwt';

export const decodeFlexbaseToken = (token: string) => {
    const decoded = jwt_decode<FlexbaseJwt>(token);
    return {
        email: decoded.email,
        companyId: decoded.companyId,
        id: decoded.id,
    };
};
