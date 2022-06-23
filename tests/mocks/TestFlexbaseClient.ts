import { Mock } from "moq.ts";
import { FlexbaseAuthenticationTokenAccessor, FlexbaseClient } from "../../src";
import { mockUrl } from "./server/constants";
import wretch from "wretch";
import { AuthenticationToken, AuthenticationTokenAccessor } from "@flexbase/http-client-middleware";
import { Logger } from "@flexbase/logger";

export const testTokenAccessor = new Mock<FlexbaseAuthenticationTokenAccessor>();

class NullLogger implements Logger{
    error(message: any, ...optionalParams: any[]): void {
        
    }
    warn(message: any, ...optionalParams: any[]): void {
        
    }
    info(message: any, ...optionalParams: any[]): void {
       
    }
    debug(message: any, ...optionalParams: any[]): void {
       
    }
    trace(message: any, ...optionalParams: any[]): void {
       
    }

}

export const testFlexbaseClient = new FlexbaseClient(
    wretch(mockUrl)
        .polyfills({ fetch: require("node-fetch") }),
    testTokenAccessor.object(), new NullLogger());

export class ProtectedFlexbaseClient extends FlexbaseClient {
    setAuthenticationToken(authToken: AuthenticationToken | null) {
        super.setAuthenticationToken(authToken);
    }

    get public_tokenAccessor(): AuthenticationTokenAccessor<any> {
        return this.tokenAccessor;
    }
}