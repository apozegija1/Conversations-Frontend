import { Injectable } from '@angular/core';

import {Constants} from '../../shared/models/constants';
import {BaseApiService} from '../../shared/services/base-api.service';
import {ApiService} from '../../core/services/api.service';
import {IRole} from '../models/irole.interface';

@Injectable()
export class RoleApiService extends BaseApiService<IRole> {
  constructor(apiService: ApiService) {
    super(apiService, Constants.Api.Roles);
  }
}
