import type { ITokenStorage } from "@/auth/ITokenStorage";
import { ServiceCollection } from "@/DI";
import { Role } from "@/model/app/Roles";
import { inject } from "vue";

export interface IAuthenticationService {
  getRole(): Role | null;
}

export default class AuthenticationService implements IAuthenticationService {
  private storage: ITokenStorage;

  constructor(storage: ITokenStorage) {
    this.storage = storage;
  }

  getRole(): Role | null {
    return null;
  }

  isTokenValid() : boolean{
    return true;
  }
}
