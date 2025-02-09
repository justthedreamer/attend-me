import type {ITokenStorage} from "./ITokenStorage";
import authConfig from "../config/auth.json";
import {jwtDecode} from "jwt-decode";
import type {Role} from "../model/app/Roles.ts";

export class LocalTokenStorage implements ITokenStorage {
    get accessToken(): string | null {
        return localStorage.getItem(authConfig.access_token_key);
    }

    set accessToken(token: string) {
        localStorage.setItem(authConfig.access_token_key, token);
    }


    get accessTokenExpiry() {
        return localStorage.getItem(authConfig.access_token_expiry_key)
    }

    set accessTokenExpiry(date: Date) {
        localStorage.setItem(authConfig.access_token_expiry_key, date.toString());
    };


    get deviceToken(): string | null {
        return localStorage.getItem(authConfig.device_token_key);
    }

    set deviceToken(token: string) {
        localStorage.setItem(authConfig.device_token_key, token);
    }


    get role(): Role {
        return localStorage.getItem(authConfig.role_key)
    }

    set role(token: string): void {
        const decodedToken = jwtDecode(token)
        const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
        localStorage.setItem(authConfig.role_key, role);
    }
}
