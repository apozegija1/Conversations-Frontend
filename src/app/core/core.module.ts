import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {CustomUrlPrefixInterceptor} from '../shared/interceptors/http.interceptor';
import {JwtInterceptor} from '../shared/interceptors/jwt.interceptor';
import {AlertService} from '../shared/services/alert.service';
import {NotFoundComponent} from './components/not-found/not-found.component';

// Anything in core that is added should be something that is only used as singleton once in app, global loader, modals, etc
@NgModule({
  declarations: [
    NotFoundComponent,
  ],
  imports: [
    HttpClientModule,
  ],
  providers: [
    AlertService,
    { provide: HTTP_INTERCEPTORS, useClass: CustomUrlPrefixInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
  ],
  exports: []
})
export class CoreModule { }
