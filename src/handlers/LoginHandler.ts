import type LoginEvent from "./events/LoginEvent.ts";
import {inject} from "vue";
import {ServiceCollection} from "../DI.ts";
import type {ITokenStorage} from "../auth/ITokenStorage.ts";

export default class LoginHandler {
    handle(event: LoginEvent): void {
        const token_storage = inject<ITokenStorage>(ServiceCollection.TOKEN_STORAGE.key)

        if (!token_storage) {
            throw new Error("Cannot handle login event, token storage is not injected.")
        }

        token_storage.setAccessToken(event.login_result.token)
        token_storage.setAccessTokenExpiry(Date.parse(event.login_result.expires))
        token_storage.setRole()
    }
}