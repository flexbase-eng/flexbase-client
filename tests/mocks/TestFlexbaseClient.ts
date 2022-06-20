import { Mock } from "moq.ts";
import { FlexbaseAuthenticationTokenAccessor, FlexbaseClient } from "../../src";
import { mockUrl } from "./server/constants";
import wretch from "wretch";
import { AuthenticationToken, AuthenticationTokenAccessor } from "@flexbase/http-client-middleware";

export const testTokenAccessor = new Mock<FlexbaseAuthenticationTokenAccessor>();

export const testFlexbaseClient = new FlexbaseClient(
    wretch(mockUrl)
        .polyfills({ fetch: require("node-fetch") }),
    testTokenAccessor.object());

export class ProtectedFlexbaseClient extends FlexbaseClient {
    setAuthenticationToken(authToken: AuthenticationToken | null) {
        super.setAuthenticationToken(authToken);
    }

    get public_tokenAccessor(): AuthenticationTokenAccessor<any> {
        return this.tokenAccessor;
    }
}