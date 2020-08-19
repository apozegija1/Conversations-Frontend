import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class CustomUrlPrefixInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /*const url = environment.baseUri;
    if (req.url.indexOf('api') >= 0) {
      req = req.clone({
        url: url + req.url
      });
    }*/

    return next.handle(req);
  }
}
