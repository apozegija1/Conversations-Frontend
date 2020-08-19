import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {DashboardRoutingComponents, DashboardRoutingModule} from './dashboard-routing.module';

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule,
  ],
  declarations: [...DashboardRoutingComponents]
})
export class DashboardModule { }
