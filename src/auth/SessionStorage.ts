import authConfig from "../config/auth.json";
import {jwtDecode, type JwtPayload} from "jwt-decode";
import type {Role} from "../model/Roles.ts";

interface RoleJwtPayload extends JwtPayload {
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: Role,
}

export class SessionStorage {
    static getAccessTokenExpiry(): Date | null {
        const authData = sessionStorage.getItem(authConfig.access_token_key)
        const json = JSON.parse(authData!);
        return new Date(json.expires);
    }

    static getRole(): Role | null {
        const authData = sessionStorage.getItem(authConfig.access_token_key)
        const json = JSON.parse(authData!);
        const token = json.token;
        const decoded = jwtDecode<RoleJwtPayload>(token);
        const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]

        return role ?? null;
    }

    static logout() {
        sessionStorage.removeItem(authConfig.access_token_key);
    }
}