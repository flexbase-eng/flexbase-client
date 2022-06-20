import { DateTime } from 'luxon';
import { FlexbaseAuthenticationTokenAccessor, FlexbasePasswordCredentials } from '../../src/index';
import { goodPass, goodRefreshToken, goodToken, goodUser, tokenUrl } from '../mocks/server/constants';

test("FlexbaseAuthenticationTokenAccessor Success", async () => {
    const tokenAccessor = new FlexbaseAuthenticationTokenAccessor();
    const response = await tokenAccessor.requestToken(new FlexbasePasswordCredentials({
        tokenUrl,
        username: goodUser,
        password: goodPass,
    }), undefined);

    expect(response).not.toBeNull();

    const token = response!;

    const exp = DateTime.utc().plus(3600).toUnixInteger();

    expect(token.tokenType).toBe("Bearer");
    expect(token.token).toBe(goodToken);
    expect(token.expiration).toBe(exp);
    expect(token.refreshToken).toBe(goodRefreshToken);
    expect(token.scope).toBe("ADMIN");
});

test("FlexbaseAuthenticationTokenAccessor refresh token success", async () => {
    const tokenAccessor = new FlexbaseAuthenticationTokenAccessor();

    const response = await tokenAccessor.requestToken(new FlexbasePasswordCredentials({
        refreshTokenUrl: tokenUrl,
        username: goodUser,
        scope: "scope"
    }), goodRefreshToken);

    expect(response).not.toBeNull();

    const token = response!;

    const exp = DateTime.utc().plus(3600).toUnixInteger();

    expect(token.tokenType).toBe("Bearer");
    expect(token.token).toBe(goodToken);
    expect(token.expiration).toBe(exp);
    expect(token.refreshToken).toBe(goodRefreshToken);
    expect(token.scope).toBe("ADMIN");
});