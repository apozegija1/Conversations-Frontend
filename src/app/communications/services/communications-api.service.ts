import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import {Constants} from '../../shared/models/constants';
import {BaseApiService} from '../../shared/services/base-api.service';
import {ApiService} from '../../core/services/api.service';
import {ICommunication} from '../models/icommunication.interface';
import {Observable} from 'rxjs';
import {communications} from './mock.data';

@Injectable()
export class CommunicationsApiService extends BaseApiService<ICommunication> {
  constructor(apiService: ApiService) {
    super(apiService, Constants.Api.Communications);
  }

  getAllUserCommunications(): Observable<any> {
    return of(communications);
  }
}
