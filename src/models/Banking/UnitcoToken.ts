export interface CreateTokenRequest {
    expiresIn?: number;
    scope: string;
    verificationCode: string;
    verificationToken: string;
}
