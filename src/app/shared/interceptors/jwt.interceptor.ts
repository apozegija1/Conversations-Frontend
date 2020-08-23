import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../../auth/services/authentication.service';
import {AuthHelper} from '../../auth/helpers/auth.helper';
import {IAuthToken} from '../../auth/models/iauth-token.interface';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const authToken: IAuthToken = this.authenticationService.getUserAuth();
        const token = AuthHelper.getToken(authToken);
        if (authToken && token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request);
    }
}
