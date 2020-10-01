import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {CommunicationsRoutingComponents, CommunicationsRoutingModule} from './communications-routing.module';
import {UsersModule} from '../users/users.module';

@NgModule({
  imports: [
    SharedModule,
    CommunicationsRoutingModule,
    UsersModule
  ],
  providers: [],
  declarations: [...CommunicationsRoutingComponents]
})
export class CommunicationsModule { }
