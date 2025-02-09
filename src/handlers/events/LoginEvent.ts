import type {LoginResult} from "../../client/backend/AttendMeBackendClientBase.ts";

export default class LoginEvent {
    date: Date = DateTime.Now()
    login_result: LoginResult

    constructor(login_result: LoginResult) {
        this.login_result = login_result;
    }
}