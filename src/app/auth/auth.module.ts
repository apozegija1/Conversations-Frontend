import { NgModule } from '@angular/core';
import {AuthRoutingComponents, AuthRoutingModule} from './auth-routing.module';
import {SharedModule} from '../shared/shared.module';
import {AuthenticationApiService} from './services/authentication-api.service';

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule,
  ],
  declarations: [...AuthRoutingComponents],
  providers: [AuthenticationApiService]
})
export class AuthModule { }
