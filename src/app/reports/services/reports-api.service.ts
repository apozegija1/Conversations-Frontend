import {Injectable} from '@angular/core';

import {Constants} from '../../shared/models/constants';
import {BaseApiService} from '../../shared/services/base-api.service';
import {ApiService} from '../../core/services/api.service';
import {IReport} from '../models/ireport.interface';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../../auth/services/authentication.service';

@Injectable()
export class ReportsApiService extends BaseApiService<IReport> {
  private companyId: number;
  constructor(apiService: ApiService,
              private authenticationService: AuthenticationService) {
    super(apiService, Constants.Api.Statistics);
  }

  getAverageDuration(start: string, end: string): Observable<IReport[]>{
    this.companyId = this.authenticationService.getCurrentUser().company.id;
    const queryParams = `fromDate=${start}&toDate=${end}&companyId=${this.companyId}`;
    return this.apiService.get(`${Constants.Api.Statistics}/avgCommunicationDuration?${queryParams}`);
  }

  getCommunicationCount(start: string, end: string): Observable<IReport[]>{
    const queryParams = `fromDate=${start}&toDate=${end}&companyId=${this.companyId}`;
    return this.apiService.get(`${Constants.Api.Statistics}/communicationCount?${queryParams}`);
  }
}
