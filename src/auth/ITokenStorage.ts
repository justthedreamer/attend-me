// Provides methods to store and retrieve user authentication keys.
import type {Role} from "../model/app/Roles.ts";

export interface ITokenStorage {
    get accessToken(): string | null;

    set accessToken(token: string): void;


    get accessTokenExpiry(): Date | null;

    set accessTokenExpiry(date: Date): void;


    get deviceToken(): string | null;

    set deviceToken(token: string): void;


    get role(): Role | null;

    set role(token: string): void;
}
