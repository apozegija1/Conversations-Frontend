import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './shared/guards/auth.guard';
import {DashboardModule} from './dashboard/dashboard.module';
import {UserRouteUtils} from './users/utils/user-route.utils';
import {CompanyRouteUtils} from './companies/utils/company-route.utils';
import {CommunicationRouteUtils} from './communications/utils/communication-route.utils';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => DashboardModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard],
    data: { roles: UserRouteUtils.getListRouteRoles() }
  },
  {
    path: 'companies',
    loadChildren: () => import('./companies/companies.module').then(m => m.CompaniesModule),
    canActivate: [AuthGuard],
    data: { roles: CompanyRouteUtils.getListRouteRoles() }
  },
  {
    path: 'communications',
    loadChildren: () => import('./communications/communications.module').then(m => m.CommunicationsModule),
    canActivate: [AuthGuard],
    data: { roles: CommunicationRouteUtils.getListRouteRoles() }
  },
  {
    path: 'admin', redirectTo: '/',
  },
];
// https://plnkr.co/edit/5impstull9EBCUxlw26k?preview We need to user @NgModule when exporting routes in submodules
// to avoid problem with routes conflicts
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
