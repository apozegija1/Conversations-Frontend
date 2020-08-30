import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {UsersRoutingComponents, UsersRoutingModule} from './users-routing.module';
import {UserApiService} from './services/user-api.service';
import {RoleApiService} from './services/role-api.service';

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule,
  ],
  providers: [RoleApiService, UserApiService],
  declarations: [...UsersRoutingComponents]
})
export class UsersModule { }
