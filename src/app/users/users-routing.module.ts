import { RouterModule, Routes } from '@angular/router';
import {UserInfoComponent} from './components/user-info/user-info.component';
import {UsersListComponent} from './components/users-list/users-list.component';
import {UserRouteUtils} from './utils/user-route.utils';
import {UserCreateComponent} from './components/user-create/user-create.component';

export const UsersRoutes: Routes = [
  {
    path: '',
    component: UsersListComponent,
    data: {
      roles: UserRouteUtils.getListRouteRoles()
    }
  },
  {
    path: 'create',
    component: UserCreateComponent,
    data: {
      roles: UserRouteUtils.getCreateRouteRoles()
    }
  },
  {
    path: ':id',
    component: UserInfoComponent,
    data: {
      roles: UserRouteUtils.getCreateRouteRoles()
    }
  }
];

export const UsersRoutingModule = RouterModule.forChild(UsersRoutes);

export const UsersRoutingComponents = [UsersListComponent, UserInfoComponent, UserCreateComponent];

