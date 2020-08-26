import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {CommunicationsRoutingComponents, CommunicationsRoutingModule} from './communications-routing.module';
import {CommunicationsApiService} from './services/communications-api.service';

@NgModule({
  imports: [
    SharedModule,
    CommunicationsRoutingModule,
  ],
  providers: [CommunicationsApiService],
  declarations: [...CommunicationsRoutingComponents]
})
export class CommunicationsModule { }
