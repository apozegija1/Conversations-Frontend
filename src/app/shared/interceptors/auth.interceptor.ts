import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../auth/services/authentication.service';
import {AlertService} from '../services/alert.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router,
              private authService: AuthenticationService,
              private alertService: AlertService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('req.headers =', req.headers, ';');
    return next.handle(req)
      .pipe(catchError((err: any, caught) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 403) {
          // If forbidden navigate to index page
          this.router.navigate(['/']);
        }
        if (err.status === 401) {
          this.alertService.error('Session expired, please login again', true);
          this.authService.logout();
        }
        return throwError(err);
      }
    }));
  }
}
