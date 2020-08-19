import { RouterModule, Routes } from '@angular/router';
import {UserInfoComponent} from './components/user-info/user-info.component';
import {UsersListComponent} from './components/users-list/users-list.component';

export const UsersRoutes: Routes = [
  {
    path: '',
    component: UsersListComponent
  },
  {
    path: ':id',
    component: UserInfoComponent
  }
];

export const UsersRoutingModule = RouterModule.forChild(UsersRoutes);

export const UsersRoutingComponents = [UsersListComponent, UserInfoComponent];

