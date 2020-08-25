import { RouterModule, Routes } from '@angular/router';
import {CompaniesListComponent} from './components/companies-list/companies-list.component';
import {CompaniesCreateComponent} from './components/companies-create/companies-create.component';

export const CommunicationRoutes: Routes = [
  {
    path: 'list',
    component: CompaniesListComponent
  },
  {
    path: 'create',
    component: CompaniesCreateComponent
  }
];

export const CompaniesRoutingModule = RouterModule.forChild(CommunicationRoutes);

export const CompaniesRoutingComponents = [CompaniesListComponent, CompaniesCreateComponent];

