import { AuthenticationToken } from '@flexbase/http-client-middleware';
import { DateTime } from 'luxon';
import jwt_decode from 'jwt-decode';
import { FlexbaseJwt } from '../models/auth/FlexbaseJwt';
import { FlexbaseTokenResponse } from '../models/auth/FlexbaseTokenResponse';

export const convertFlexbaseToken = (tokenResponse: FlexbaseTokenResponse): AuthenticationToken | null => {
    if (!tokenResponse.success) {
        return null;
    }

    const isChallenge = !!tokenResponse.message?.startsWith('Sent code');
    if (isChallenge) {
        return {
            tokenType: 'Challenge',
            token: '',
            expiration: 0,
            refreshToken: '',
            scope: '',
        };
    }

    const decoded = jwt_decode<FlexbaseJwt>(tokenResponse.token);

    const future = DateTime.utc().plus(decoded.exp || 0);

    return {
        token: tokenResponse.token,
        tokenType: 'Bearer',
        expiration: future.toUnixInteger(),
        refreshToken: tokenResponse.token,
        scope: (decoded.roles) ? decoded.roles.join(' ') : '[]', 
    };
};
