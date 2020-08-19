import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../../auth/services/authentication.service';
import {AuthHelper} from '../../auth/helpers/auth.helper';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const currentUser = this.authenticationService.getCurrentUser();
        if (currentUser && AuthHelper.getToken(currentUser)) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${AuthHelper.getToken(currentUser)}`
                }
            });
        }

        return next.handle(request);
    }
}
