import { RouterModule, Routes } from '@angular/router';
import {UserInfoComponent} from './components/user-info/user-info.component';
import {UsersListComponent} from './components/users-list/users-list.component';
import {Role} from './models/role.enum';

export const UsersRoutes: Routes = [
  {
    path: '',
    component: UsersListComponent,
    data: { roles: [Role.Admin] }
  },
  {
    path: ':id',
    component: UserInfoComponent
  }
];

export const UsersRoutingModule = RouterModule.forChild(UsersRoutes);

export const UsersRoutingComponents = [UsersListComponent, UserInfoComponent];

