import { dateReviver } from "../helpers/JsonHelpers";
import {
  AttendMeBackendClientBase,
  type LoginResult,
} from "./AttendMeBackendClientBase";
// import { Dialog, Loading } from 'quasar'

export class AttendMeBackendClient extends AttendMeBackendClientBase {
  #authToken?: string;
  #authTokenExpires?: Date;

  constructor(url: string) {
    const http: unknown = {
      fetch: null,
    };
    super(url, http as ApiHttpClient);
    (http as ApiHttpClient).fetch = this.fetchWrapper.bind(this);

    this.jsonParseReviver = dateReviver;
  }

  override userLogin(
    loginName: string,
    password: string
  ): Promise<LoginResult> {
    return super.userLogin(loginName, password).then((r) => {
      if (!r || !r.token)
        throw new Error("Authorization response returned empty token!");

      // set token for further processing
      this.#authToken = r.token;
      this.#authTokenExpires = r.expires;

      return r;
    });
  }

  isTokenExpired() {
    return !this.#authTokenExpires || this.#authTokenExpires < new Date();
  }

  private fetchWrapper(
    requestInfo: RequestInfo,
    init?: RequestInit
  ): Promise<Response> {
    const opts: RequestInit = {
      ...init,
    };

    const requestUrl =
      typeof requestInfo === "string" ? requestInfo : requestInfo.url;

    if (this.#authToken && !requestUrl.startsWith("/user/login")) {
      opts.headers = {
        ...opts.headers,
        Authorization: `Bearer ${this.#authToken}`,
      };
    }

    return fetch(requestInfo, opts);
  }
}

type ApiHttpClient = {
  fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
};
