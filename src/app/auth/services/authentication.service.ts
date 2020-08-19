import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Constants} from '../../shared/models/constants';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {LocalStorageService} from '../../shared/services/local-storage.service';
import {IAuthToken} from '../models/iauth-token.interface';
import {AuthenticationApiService} from './authentication-api.service';
import {AuthHelper} from '../helpers/auth.helper';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private authenticationApiService: AuthenticationApiService,
                private localStorageService: LocalStorageService) { }

    public getCurrentUser(): IAuthToken {
      return this.localStorageService.getItem(Constants.LocalStorageKey.CurrentUser);
    }

    get isLoggedIn(): boolean {
      const user: IAuthToken = this.localStorageService.getItem(Constants.LocalStorageKey.CurrentUser);
      return user ? AuthHelper.getToken(user) != null : false; // {2}
    }

    public getIsUserLoggedIn() {
      return this.isLoggedIn$.asObservable();
    }

    public notifyUserLoggedIn(value: boolean): void {
      this.isLoggedIn$.next(value);
    }

    login(username: string, password: string): Observable<IAuthToken> {
        return this.authenticationApiService.login(username, password)
          .pipe(map((user: IAuthToken) => {
                // login successful if there's a jwt token in the response
                if (user && AuthHelper.getToken(user)) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    this.localStorageService.setItem(Constants.LocalStorageKey.CurrentUser, user);
                    this.notifyUserLoggedIn(true);
                }

                return user;
            }));
    }

    logout(): void {
      // remove user from local storage to log user out
      this.localStorageService.removeItem(Constants.LocalStorageKey.CurrentUser);
      this.notifyUserLoggedIn(false);
    }
}
