import {AuthenticationService} from '../../auth/services/authentication.service';
import {IUser} from '../../users/models/iuser.interface';

export abstract class BaseUserInfo {
  public currentUser: IUser;

  protected constructor(protected authService: AuthenticationService) {
    this.setCurrentUser();
  }

  protected setCurrentUser() {
    this.currentUser = this.authService.getCurrentUser();
  }
}
