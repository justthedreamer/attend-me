import {SessionStorage} from "../auth/SessionStorage.ts";

export const checkIsAccessTokenExpired: boolean = () => {
    const date = SessionStorage.getAccessTokenExpiry()

    if (!date) return false;

    return date < new Date()
}
