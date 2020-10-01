import {AuthenticationService} from '../../auth/services/authentication.service';
import {IUser} from '../../users/models/iuser.interface';
import {SubSink} from './sub-sink';
import {BaseSubscription} from './base-subscription';

export abstract class BaseUserInfo extends  BaseSubscription {
  public currentUser: IUser;

  protected constructor(protected authService: AuthenticationService) {
    super();
    this.setCurrentUser();
  }

  protected setCurrentUser() {
    this.currentUser = this.authService.getCurrentUser();
  }
}
