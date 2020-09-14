import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../../auth/services/authentication.service';
import {ApiService} from '../../core/services/api.service';
import {Constants} from '../../shared/models/constants';
import {IUser} from '../../users/models/iuser.interface';
import {BaseApiService} from '../../shared/services/base-api.service';
import {environment} from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders( { 'Content-type': 'application/json' } )
};

@Injectable({
  providedIn: 'root'
})
export class StatisticsService extends BaseApiService<any> {
  private currentUser: IUser;

  constructor(private http: HttpClient, private authService: AuthenticationService, apiService: ApiService) {
    super(apiService, Constants.Api.Statistics);
    this.currentUser = this.authService.getCurrentUser();
  }

  getStats(){
    return this.apiService.get(Constants.Api.Statistics + `/overview`);
  }

  getStatsForChart() {
    return this.apiService.get(Constants.Api.Statistics + `/chartOverview`);
  }
}
