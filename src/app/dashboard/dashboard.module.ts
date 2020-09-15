import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {DashboardRoutingComponents, DashboardRoutingModule} from './dashboard-routing.module';
import {ChartsModule} from 'ng2-charts';

@NgModule({
    imports: [
        SharedModule,
        DashboardRoutingModule,
        ChartsModule,
    ],
  declarations: [...DashboardRoutingComponents]
})
export class DashboardModule { }
