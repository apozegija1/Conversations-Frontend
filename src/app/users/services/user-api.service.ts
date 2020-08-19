import { Injectable } from '@angular/core';

import { IUser } from '../models/iuser.interface';
import {Constants} from '../../shared/models/constants';
import {BaseApiService} from '../../shared/services/base-api.service';
import {ApiService} from '../../core/services/api.service';

@Injectable()
export class UserApiService extends BaseApiService<IUser> {
  constructor(apiService: ApiService) {
    super(apiService, Constants.Api.Users);
  }
}
