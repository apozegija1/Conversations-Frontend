import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import {Constants} from '../../shared/models/constants';
import {BaseApiService} from '../../shared/services/base-api.service';
import {ApiService} from '../../core/services/api.service';
import {ICommunication} from '../models/icommunication.interface';
import {Observable} from 'rxjs';
import {IUserCommunication} from '../models/iuser-communication.interface';
import {IUser} from '../../users/models/iuser.interface';

@Injectable({
  providedIn: 'root' // Need to be in root as it is used in Md Dialog popup
})
export class CommunicationsApiService extends BaseApiService<ICommunication> {
  constructor(apiService: ApiService) {
    super(apiService, Constants.Api.Communications);
  }

  getAllUserCommunications(): Observable<IUserCommunication[]> {
    return this.apiService.get<IUserCommunication[]>(`${this.baseUri}/users`);
  }

  public obtainWebRtcToken(user: IUser) {
    return this.apiService.get<any>(`${this.baseUri}/webrtc/${user.id}`);
  }
}
