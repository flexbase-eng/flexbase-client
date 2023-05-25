/**
 * https://github.com/auth0/jwt-decode
 * doesn't support nodenext yet so copying here
 */

export interface JwtDecodeOptions {
  header?: boolean;
}

export interface JwtHeader {
  typ?: string;
  alg?: string;
  kid?: string;
}

export interface JwtPayload {
  iss?: string;
  sub?: string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
}

export const jwtDecode = <T>(token: unknown, options?: JwtDecodeOptions): T => {
  if (typeof token !== 'string') {
    throw new Error('Invalid token specified: must be a string');
  }

  options = options || {};
  const pos = options.header === true ? 0 : 1;

  const part = token.split('.')[pos];
  if (typeof part !== 'string') {
    throw new Error('Invalid token specified: missing part #' + (pos + 1));
  }

  let decoded: string;

  try {
    decoded = base64_url_decode(part);
  } catch (e) {
    throw new Error('Invalid token specified: invalid base64 for part #' + (pos + 1) + ' (' + (e as Error).message + ')');
  }

  try {
    return JSON.parse(decoded);
  } catch (e) {
    throw new Error('Invalid token specified: invalid json for part #' + (pos + 1) + ' (' + (e as Error).message + ')');
  }
};

const b64DecodeUnicode = (str: string) => {
  return decodeURIComponent(
    Buffer.from(str, 'base64')
      .toString()
      .replace(/(.)/g, function (m, p) {
        let code = p.charCodeAt(0).toString(16).toUpperCase();
        if (code.length < 2) {
          code = '0' + code;
        }
        return '%' + code;
      })
  );
};

const base64_url_decode = (str: string) => {
  let output = str.replace(/-/g, '+').replace(/_/g, '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw new Error('base64 string is not of the correct length');
  }

  try {
    return b64DecodeUnicode(output);
  } catch (err) {
    return Buffer.from(output, 'base64').toString();
  }
};
