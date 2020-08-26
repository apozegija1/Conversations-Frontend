import { Injectable } from '@angular/core';

import {Constants} from '../../shared/models/constants';
import {BaseApiService} from '../../shared/services/base-api.service';
import {ApiService} from '../../core/services/api.service';
import {ICompany} from '../models/icompany.interface';

@Injectable()
export class CompanyApiService extends BaseApiService<ICompany> {
  constructor(apiService: ApiService) {
    super(apiService, Constants.Api.Companies);
  }
}
