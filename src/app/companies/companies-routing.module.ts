import { RouterModule, Routes } from '@angular/router';
import {CompaniesListComponent} from './components/companies-list/companies-list.component';
import {CompaniesCreateComponent} from './components/companies-create/companies-create.component';
import {CompanyRouteUtils} from './utils/company-route.utils';

export const CommunicationRoutes: Routes = [
  {
    path: '',
    component: CompaniesListComponent
  },
  {
    path: 'create',
    component: CompaniesCreateComponent,
    data: { roles: CompanyRouteUtils.getCreateRouteRoles() }
  }
];

export const CompaniesRoutingModule = RouterModule.forChild(CommunicationRoutes);

export const CompaniesRoutingComponents = [CompaniesListComponent, CompaniesCreateComponent];

