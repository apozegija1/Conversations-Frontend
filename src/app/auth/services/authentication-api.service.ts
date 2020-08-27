import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Constants} from '../../shared/models/constants';
import {Observable} from 'rxjs';
import {IUser} from '../../users/models/iuser.interface';
import {IAuthToken} from '../models/iauth-token.interface';
import {ApiService} from '../../core/services/api.service';
import {IAuthLogin} from '../models/iauth-login.interface';

@Injectable()
export class AuthenticationApiService {
    constructor(private apiService: ApiService) { }

    login(data: IAuthLogin): Observable<IAuthToken> {
        return this.apiService.post<IAuthToken>(Constants.Api.Login, data)
          .pipe(map((user: IAuthToken) => {
                return user;
            }));
    }

    register(user: IUser): Observable<IUser> {
      return this.apiService.post<IUser>(Constants.Api.Register, user);
    }

    getLoggedUser(): Observable<IUser> {
      return this.apiService.get<IUser>(Constants.Api.CurrentUser);
    }
}
