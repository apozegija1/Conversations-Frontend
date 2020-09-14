import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {UsersRoutingComponents, UsersRoutingModule} from './users-routing.module';
import {RoleApiService} from './services/role-api.service';
import {UsersSearchComponent} from './components/users-search/users-search.component';
import {UserApiService} from './services/user-api.service';

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule,
  ],
  providers: [RoleApiService, UserApiService],
  declarations: [...UsersRoutingComponents],
  exports: [UsersSearchComponent]
})
export class UsersModule { }
