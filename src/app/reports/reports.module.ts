import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {ReportsRoutingComponents, ReportsRoutingModule} from './reports-routing.module';
import {ReportsApiService} from './services/reports-api.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSortModule} from '@angular/material/sort';


@NgModule({
    imports: [
        SharedModule,
        ReportsRoutingModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSortModule
    ],
  providers: [ReportsApiService,
],
  exports: [
  ],
  declarations: [...ReportsRoutingComponents]
})
export class ReportsModule { }
