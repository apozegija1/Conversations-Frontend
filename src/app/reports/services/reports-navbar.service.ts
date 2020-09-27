import {NavbarService} from '../../shared/services/navbar/navbar.service';
import { Injectable } from '@angular/core';
import {Constants} from '../../shared/models/constants';
import {MenuStateType} from '../../shared/models/enums/menu-state-type.enum';
import {MenuItemType} from '../../shared/models/enums/menu-item-type.enum';
import {Role} from '../../users/models/role.enum';


@Injectable({
  providedIn: 'root'
})
export class ReportsNavbarService {
  constructor(private navbarService: NavbarService) {}

  public addMenu(): void {
    this.navbarService.addMenuItem(Constants.Menu.defaultTopMenuName, {
      icon: 'analytics',
      title: 'reports_label',
      state: MenuStateType.Reports,
      type: MenuItemType.Dropdown,
      roles: [Role.CompanyAdmin]
    });

    this.navbarService.addSubMenuItem(Constants.Menu.defaultTopMenuName, MenuStateType.Reports, {
      title: 'reports_communications_label',
      path: '/reports/communications',
      icon: 'forum',
      state: MenuStateType.Reports,
      roles: [Role.CompanyAdmin]
    });
  }
}
