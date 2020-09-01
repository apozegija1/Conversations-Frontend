import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {LoadingInterceptor} from '../shared/interceptors/loading.interceptor';
import {JwtInterceptor} from '../shared/interceptors/jwt.interceptor';
import {AlertService} from '../shared/services/alert.service';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {AuthInterceptor} from '../shared/interceptors/auth.interceptor';

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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
  ],
  exports: []
})
export class CoreModule { }
