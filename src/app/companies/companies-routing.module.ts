import { RouterModule, Routes } from '@angular/router';
import {CompaniesListComponent} from './components/companies-list/companies-list.component';

export const CommunicationRoutes: Routes = [
  {
    path: '',
    component: CompaniesListComponent
  }
];

export const CompaniesRoutingModule = RouterModule.forChild(CommunicationRoutes);

export const CompaniesRoutingComponents = [CompaniesListComponent];

