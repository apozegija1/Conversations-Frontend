import {Injectable} from '@angular/core';
import {AuthenticationService} from '../../../auth/services/authentication.service';
import {ApiService} from '../../../core/services/api.service';
import {Constants} from '../../models/constants';
import {BaseApiService} from '../base-api.service';
import {Observable} from 'rxjs';
import {IOverview} from '../../models/interfaces/ioverview.interface';
import {IChartOverview} from '../../models/interfaces/ichart-overview.interface';

@Injectable({
  providedIn: 'root'
})
export class StatisticsApiService extends BaseApiService<any> {

  constructor(private authService: AuthenticationService, apiService: ApiService) {
    super(apiService, Constants.Api.Statistics);
  }

  getOverview(): Observable<IOverview[]> {
    return this.apiService.get(Constants.Api.Statistics + `/overview`);
  }

  getChartOverview(): Observable<IChartOverview[]> {
    return this.apiService.get(Constants.Api.Statistics + `/chartOverview`);
  }
}
