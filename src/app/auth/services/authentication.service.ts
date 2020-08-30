import {Injectable} from '@angular/core';
import {map, mergeMap} from 'rxjs/operators';
import {Constants} from '../../shared/models/constants';
import {Observable, Subject, throwError} from 'rxjs';
import {LocalStorageService} from '../../shared/services/local-storage.service';
import {IAuthToken} from '../models/iauth-token.interface';
import {AuthenticationApiService} from './authentication-api.service';
import {AuthHelper} from '../helpers/auth.helper';
import {IUser} from '../../users/models/iuser.interface';
import {Role} from '../../users/models/role.enum';
import {IAuthLogin} from '../models/iauth-login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    private isLoggedIn$: Subject<boolean> = new Subject<boolean>();

    private currentUser: IUser;

    constructor(private authenticationApiService: AuthenticationApiService,
                private localStorageService: LocalStorageService) {
      this.currentUser = this.getCurrentUser();
    }

    public getCurrentUser(): IUser {
      return this.currentUser ? this.currentUser : this.localStorageService.getItem(Constants.LocalStorageKey.CurrentUser);
    }

    public getUserAuth(): IAuthToken {
      return this.localStorageService.getItem(Constants.LocalStorageKey.CurrentAuth);
    }

    public get isLoggedIn(): boolean {
      const user: IAuthToken = this.getUserAuth();
      return user ? AuthHelper.getToken(user) != null : false; // {2}
    }

    public getIsUserLoggedIn() {
      return this.isLoggedIn$.asObservable();
    }

    public notifyUserLoggedIn(value: boolean): void {
      this.isLoggedIn$.next(value);
    }

    public login(data: IAuthLogin): Observable<IUser> {
        return this.authenticationApiService.login(data)
          .pipe(mergeMap((authToken: IAuthToken): Observable<IUser> => {
                // login successful if there's a jwt token in the response
                if (authToken && AuthHelper.getToken(authToken)) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  this.setAuthStorage(authToken);
                  return this.authenticationApiService.getLoggedUser();
                } else {
                  return throwError('Missing auth token');
                }
            }), map((user: IUser) => {
              this.setUserStorage(user);
              this.notifyUserLoggedIn(true);
              return user;
            }));
    }

    public logout(): void {
      this.clearUserStorage();
      this.notifyUserLoggedIn(false);
    }

    public isCompanyAdmin() {
      return this.isRole(Role.CompanyAdmin);
    }

    private clearUserStorage(): void {
      // remove user from local storage to log user out
      this.localStorageService.removeItem(Constants.LocalStorageKey.CurrentAuth);
      this.localStorageService.removeItem(Constants.LocalStorageKey.CurrentUser);
      this.currentUser = null;
    }

    private setUserStorage(user: IUser): void {
      this.localStorageService.setItem(Constants.LocalStorageKey.CurrentUser, user);
    }

    private setAuthStorage(auth: IAuthToken): void {
      this.localStorageService.setItem(Constants.LocalStorageKey.CurrentAuth, auth);
    }

    private isRole(role: Role): boolean {
      return this.getCurrentUser().roles.find((r) => r.name === role) != null;
    }
}
