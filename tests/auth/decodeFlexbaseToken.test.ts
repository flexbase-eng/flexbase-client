import { decodeFlexbaseToken } from '../../src/index';

test("decodeFlexbaseToken Success", async () => {
    const {email, companyId, id} = decodeFlexbaseToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjM2MDAsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImNvbXBhbnlJZCI6IjEyMzQ1IiwiaWQiOiIxMjM0NTY3ODkwIiwicm9sZXMiOlsiQURNSU4iXX0.ULUU2lNhpX_cSqORqm3Udgt6r9I2a7yLwW9JKAdUPoA");

    expect(email).toBe("test@test.com");
    expect(companyId).toBe("12345");
    expect(id).toBe("1234567890");
});