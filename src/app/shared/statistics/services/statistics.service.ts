import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../../../auth/services/authentication.service';
import {ApiService} from '../../../core/services/api.service';
import {Constants} from '../../models/constants';
import {BaseApiService} from '../../services/base-api.service';
import {Observable} from 'rxjs';
import {IOverview} from '../../models/interfaces/ioverview.interface';
import {IChartOverview} from './/src/app/dashboard/components/home/ichart-overview.interface.ts';

const httpOptions = {
  headers: new HttpHeaders( { 'Content-type': 'application/json' } )
};

@Injectable({
  providedIn: 'root'
})
export class StatisticsService extends BaseApiService<any> {

  constructor(private http: HttpClient, private authService: AuthenticationService, apiService: ApiService) {
    super(apiService, Constants.Api.Statistics);
  }

  getOverview(): Observable<IOverview>{
    return this.apiService.get(Constants.Api.Statistics + `/overview`);
  }

  getChartOverview(): Observable<IChartOverview> {
    return this.apiService.get(Constants.Api.Statistics + `/chartOverview`);
  }
}
