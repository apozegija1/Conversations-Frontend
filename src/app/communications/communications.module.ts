import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {CommunicationsRoutingComponents, CommunicationsRoutingModule} from './communications-routing.module';
import {CommunicationsApiService} from './services/communications-api.service';
import {UsersModule} from '../users/users.module';

@NgModule({
  imports: [
    SharedModule,
    CommunicationsRoutingModule,
    UsersModule
  ],
  providers: [CommunicationsApiService],
  declarations: [...CommunicationsRoutingComponents]
})
export class CommunicationsModule { }
