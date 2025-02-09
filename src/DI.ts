import type {App} from "vue";
import type {ITokenStorage} from "./auth/ITokenStorage";
import {LocalTokenStorage} from "./auth/LocalTokenStorage";
import type {IAuthenticationService} from "./services/AuthenticationService";
import AuthenticationService from "./services/AuthenticationService";
import LoginHandler from "./handlers/LoginHandler.ts";


interface ApplicationService<T> {
    key: string;
    implementation: T;
}

export class ServiceCollection {
    public static readonly TOKEN_STORAGE: ApplicationService<ITokenStorage> = {
        key: "token_storage",
        implementation: new LocalTokenStorage(),
    };
    public static readonly AUTHENTICATION_SERVICE: ApplicationService<IAuthenticationService> = {
        key: "authentication_service",
        implementation: new AuthenticationService(ServiceCollection.TOKEN_STORAGE.implementation),
    }
    public static readonly LOGIN_HANDLER: ApplicationService<LoginHandler> = {
        key: "login_handler",
        implementation: new LoginHandler()
    }
}

export function registerService<T>(app: App, service: ApplicationService<T>) {
    app.provide(service.key, service.implementation);
}
