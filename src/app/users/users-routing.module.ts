import { RouterModule, Routes } from '@angular/router';
import {UsersViewComponent} from './components/users-view/users-view.component';
import {UsersListComponent} from './components/users-list/users-list.component';
import {UserRouteUtils} from './utils/user-route.utils';
import {UserCreateComponent} from './components/users-create/user-create.component';
import {UsersFormComponent} from './components/users-form/users-form.component';
import {UsersEditComponent} from './components/users-edit/users-edit.component';
import {UsersSearchComponent} from './components/users-search/users-search.component';
import {NgModule} from '@angular/core';

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
    path: 'edit/:id',
    component: UsersEditComponent,
    data: {
      roles: UserRouteUtils.getCreateRouteRoles()
    }
  },
  {
    path: 'view/:id',
    component: UsersViewComponent,
    data: {
      roles: UserRouteUtils.getCreateRouteRoles()
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(UsersRoutes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}

export const UsersRoutingComponents = [UsersFormComponent, UsersEditComponent, UsersListComponent,
    UsersViewComponent, UserCreateComponent, UsersSearchComponent];

