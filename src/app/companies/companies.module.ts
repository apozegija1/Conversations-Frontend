import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {UsersRoutingComponents, CompaniesRoutingModule} from './companies-routing.module';

@NgModule({
  imports: [
    SharedModule,
    CompaniesRoutingModule,
  ],
  declarations: [...UsersRoutingComponents]
})
export class CompaniesModule { }
