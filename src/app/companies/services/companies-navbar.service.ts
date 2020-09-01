import {NavbarService} from '../../shared/services/navbar/navbar.service';
import { Injectable } from '@angular/core';
import {Constants} from '../../shared/models/constants';
import {MenuStateType} from '../../shared/models/enums/menu-state-type.enum';
import {MenuItemType} from '../../shared/models/enums/menu-item-type.enum';
import {Role} from '../../users/models/role.enum';


@Injectable({
  providedIn: 'root'
})
export class CompaniesNavbarService {
  constructor(private navbarService: NavbarService) {}

  public addMenu(): void {
    this.navbarService.addMenuItem(Constants.Menu.defaultTopMenuName, {
      icon: 'business',
      title: 'companies_label',
      state: MenuStateType.Companies,
      type: MenuItemType.Dropdown,
      roles: [Role.Admin]
    });

    this.navbarService.addSubMenuItem(Constants.Menu.defaultTopMenuName, MenuStateType.Companies, {
      title: 'companies_list_label',
      path: '/companies',
      icon: 'view_list',
      state: MenuStateType.Companies,
      roles: [Role.Admin]
    });

    this.navbarService.addSubMenuItem(Constants.Menu.defaultTopMenuName, MenuStateType.Companies, {
      title: 'companies_create_label',
      path: '/companies/create',
      icon: 'add',
      state: MenuStateType.Companies,
      roles: [Role.Admin]
    });
  }
}
