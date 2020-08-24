import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {CompaniesRoutingComponents, CompaniesRoutingModule} from './companies-routing.module';

@NgModule({
  imports: [
    SharedModule,
    CompaniesRoutingModule,
  ],
  declarations: [...CompaniesRoutingComponents]
})
export class CompaniesModule { }
