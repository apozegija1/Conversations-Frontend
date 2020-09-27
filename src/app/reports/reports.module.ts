import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {ReportsRoutingComponents, ReportsRoutingModule} from './reports-routing.module';
import {ReportsApiService} from './services/reports-api.service';


@NgModule({
    imports: [
        SharedModule,
        ReportsRoutingModule
    ],
  providers: [ReportsApiService,
],
  exports: [
  ],
  declarations: [...ReportsRoutingComponents]
})
export class ReportsModule { }
