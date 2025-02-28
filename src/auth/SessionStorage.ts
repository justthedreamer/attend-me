import type {ISessionStorage} from "./ISessionStorage.ts";
import authConfig from "../config/auth.json";
import {jwtDecode} from "jwt-decode";
import type {Role} from "../model/app/Roles.ts";

export class LocalTokenStorage implements ISessionStorage {
    get accessToken(): string | null {
        return sessionStorage.getItem(authConfig.access_token_key);
    }

    set accessToken(token: string) {
        sessionStorage.setItem(authConfig.access_token_key, token);
    }


    get accessTokenExpiry() {
        return sessionStorage.getItem(authConfig.access_token_expiry_key)
    }

    set accessTokenExpiry(date: Date) {
        sessionStorage.setItem(authConfig.access_token_expiry_key, date.toString());
    };


    get deviceToken(): string | null {
        return sessionStorage.getItem(authConfig.device_token_key);
    }

    set deviceToken(token: string) {
        sessionStorage.setItem(authConfig.device_token_key, token);
    }


    get role(): Role {
        return sessionStorage.getItem(authConfig.role_key)
    }

    set role(token: string): void {
        const decodedToken = jwtDecode(token)
        const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
        sessionStorage.setItem(authConfig.role_key, role);
    }
}
