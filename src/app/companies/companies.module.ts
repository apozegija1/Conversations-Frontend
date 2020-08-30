import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {CompaniesRoutingComponents, CompaniesRoutingModule} from './companies-routing.module';
import {CompanyApiService} from './services/company-api.service';

@NgModule({
  imports: [
    SharedModule,
    CompaniesRoutingModule,
  ],
  providers: [CompanyApiService],
  exports: [
  ],
  declarations: [...CompaniesRoutingComponents]
})
export class CompaniesModule { }
