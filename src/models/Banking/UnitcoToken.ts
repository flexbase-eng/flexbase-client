export interface CreateTokenRequest {
    scope?: string;
    expiresIn?: number;
    verificationCode: string;
    verificationToken: string;
}
