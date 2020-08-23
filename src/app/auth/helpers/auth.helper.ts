import {IAuthToken} from '../models/iauth-token.interface';

export class AuthHelper {
  public static getToken(auth: IAuthToken): string {
    return auth ? auth.token : null;
  }
}
