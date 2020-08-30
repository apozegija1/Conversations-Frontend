import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import {Constants} from '../../shared/models/constants';
import {BaseApiService} from '../../shared/services/base-api.service';
import {ApiService} from '../../core/services/api.service';
import {ICommunication} from '../models/icommunication.interface';
import {Observable} from 'rxjs';
import {IUserCommunication} from '../models/iuser-communication.interface';

@Injectable()
export class SmsApiService {
  constructor(protected apiService: ApiService,
              protected baseUri: string) {
    this.baseUri = '';
  }

  create(message: string) {
    return this.apiService.post(this.baseUri, message);
  }
}
