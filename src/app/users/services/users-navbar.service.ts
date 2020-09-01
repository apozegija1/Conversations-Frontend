import {NavbarService} from '../../shared/services/navbar/navbar.service';
import { Injectable } from '@angular/core';
import {Constants} from '../../shared/models/constants';
import {MenuStateType} from '../../shared/models/enums/menu-state-type.enum';
import {MenuItemType} from '../../shared/models/enums/menu-item-type.enum';
import {Role} from '../models/role.enum';


@Injectable({
  providedIn: 'root'
})
export class UsersNavbarService {
  constructor(private navbarService: NavbarService) {}

  public addMenu(): void {
    this.navbarService.addMenuItem(Constants.Menu.defaultTopMenuName, {
      icon: 'supervised_user_circle',
      title: 'users_label',
      state: MenuStateType.Users,
      type: MenuItemType.Dropdown,
      roles: [Role.Admin, Role.CompanyAdmin]
    });

    this.navbarService.addSubMenuItem(Constants.Menu.defaultTopMenuName, MenuStateType.Users, {
      title: 'users_list_label',
      path: '/users',
      icon: 'view_list',
      state: MenuStateType.Users,
      roles: [Role.Admin, Role.CompanyAdmin]
    });

    this.navbarService.addSubMenuItem(Constants.Menu.defaultTopMenuName, MenuStateType.Users, {
      title: 'users_create_label',
      path: '/users/create',
      icon: 'add',
      state: MenuStateType.Users,
      roles: [Role.Admin, Role.CompanyAdmin]
    });
  }
}
