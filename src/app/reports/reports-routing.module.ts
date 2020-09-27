import {RouterModule, Routes} from '@angular/router';
import {ReportRouteUtils} from './utils/report-route.utils';
import {NgModule} from '@angular/core';
import {ReportsCommunicationsComponent} from './components/reports-communications/reports-communications.component';

export const ReportsRoutes: Routes = [
  {
    path: 'communications',
    component: ReportsCommunicationsComponent,
    data: { roles: ReportRouteUtils.getReportsRouteRoles() }
  }
];

@NgModule({
  imports: [RouterModule.forChild(ReportsRoutes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {
}
export const ReportsRoutingComponents = [ReportsCommunicationsComponent];
