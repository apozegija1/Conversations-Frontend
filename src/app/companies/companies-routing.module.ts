import { RouterModule, Routes } from '@angular/router';
import {UserInfoComponent} from './components/user-info/user-info.component';
import {UsersListComponent} from './components/users-list/users-list.component';

export const CommunicationRoutes: Routes = [
  {
    path: '',
    component: UsersListComponent
  },
  {
    path: ':id',
    component: UserInfoComponent
  }
];

export const CompaniesRoutingModule = RouterModule.forChild(CommunicationRoutes);

export const UsersRoutingComponents = [UsersListComponent, UserInfoComponent];

