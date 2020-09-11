import {NavbarService} from '../../shared/services/navbar/navbar.service';
import { Injectable } from '@angular/core';
import {Constants} from '../../shared/models/constants';
import {MenuStateType} from '../../shared/models/enums/menu-state-type.enum';
import {MenuItemType} from '../../shared/models/enums/menu-item-type.enum';
import {IUser} from '../../users/models/iuser.interface';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthNavbarService {
  constructor(private navbarService: NavbarService,
              private  authService: AuthenticationService) {}

  public addMenu(currentUser: IUser): void {
    this.navbarService.addMenuItem(Constants.Menu.defaultTopMenuName, {
      icon: 'person_pin',
      title: currentUser.username,
      state: MenuStateType.Auth,
      isRightSideDivider: true,
      type: MenuItemType.Dropdown,
      roles: ['*']
    });

    this.navbarService.addSubMenuItem(Constants.Menu.defaultTopMenuName, MenuStateType.Auth, {
      title: 'logout_label',
      icon: 'exit_to_app',
      state: MenuStateType.Auth,
      type: MenuItemType.ClickItem,
      method: this.logout,
      roles: ['*']
    });
  }

  public logout = () => {
    this.authService.logout();
  }
}
