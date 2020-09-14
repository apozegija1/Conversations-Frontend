import { RouterModule, Routes } from '@angular/router';
import {CompaniesListComponent} from './components/companies-list/companies-list.component';
import {CompaniesCreateComponent} from './components/companies-create/companies-create.component';
import {CompanyRouteUtils} from './utils/company-route.utils';
import {CompaniesFormComponent} from './components/companies-form/companies-form.component';
import {CompaniesEditComponent} from './components/companies-edit/companies-edit.component';
import {CompaniesViewComponent} from './components/companies-view/companies-view.component';
import {NgModule} from '@angular/core';

export const CommunicationRoutes: Routes = [
  {
    path: '',
    component: CompaniesListComponent
  },
  {
    path: 'create',
    component: CompaniesCreateComponent,
    data: { roles: CompanyRouteUtils.getCreateRouteRoles() }
  },
  {
    path: 'edit/:id',
    component: CompaniesEditComponent,
    data: {
      roles: CompanyRouteUtils.getCreateRouteRoles()
    }
  },
  {
    path: 'view/:id',
    component: CompaniesViewComponent,
    data: {
      roles: CompanyRouteUtils.getCreateRouteRoles()
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(CommunicationRoutes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule {
}

export const CompaniesRoutingComponents = [CompaniesFormComponent, CompaniesListComponent,
    CompaniesCreateComponent, CompaniesEditComponent, CompaniesViewComponent];

