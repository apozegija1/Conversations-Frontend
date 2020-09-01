import {NavbarService} from '../../shared/services/navbar/navbar.service';
import { Injectable } from '@angular/core';
import {Constants} from '../../shared/models/constants';
import {MenuStateType} from '../../shared/models/enums/menu-state-type.enum';

@Injectable({
  providedIn: 'root'
})
export class DashboardNavbarService {
  constructor(private navbarService: NavbarService) {}

  public addMenu(): void {
    this.navbarService.addMenuItem(Constants.Menu.defaultTopMenuName, {
      icon: 'home',
      title: 'home_label',
      path: '/',
      state: MenuStateType.Dashboard,
      roles: ['*']
    });
  }
}
