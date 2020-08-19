import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {UsersRoutingComponents, UsersRoutingModule} from './users-routing.module';

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule,
  ],
  declarations: [...UsersRoutingComponents]
})
export class UsersModule { }
