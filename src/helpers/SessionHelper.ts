import {SessionStorage} from "../auth/SessionStorage.ts";

export function checkIsAccessTokenExpired(): boolean {
    const date = SessionStorage.getAccessTokenExpiry()

    if (!date) return false;

    return date < new Date()
}
