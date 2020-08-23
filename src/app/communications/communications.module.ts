import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {CommunicationsRoutingComponents, CommunicationsRoutingModule} from './communications-routing.module';

@NgModule({
  imports: [
    SharedModule,
    CommunicationsRoutingModule,
  ],
  declarations: [...CommunicationsRoutingComponents]
})
export class CommunicationsModule { }
