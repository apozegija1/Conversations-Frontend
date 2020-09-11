import {NavbarService} from '../../shared/services/navbar/navbar.service';
import { Injectable } from '@angular/core';
import {Constants} from '../../shared/models/constants';
import {MenuStateType} from '../../shared/models/enums/menu-state-type.enum';
import {Role} from '../../users/models/role.enum';

@Injectable({
  providedIn: 'root'
})
export class CommunicationsNavbarService {
  constructor(private navbarService: NavbarService) {}

  public addMenu(): void {
    this.navbarService.addMenuItem(Constants.Menu.defaultTopMenuName, {
      icon: 'phone_in_talk',
      title: 'communications_label',
      path: '/communications',
      state: MenuStateType.Communications,
      roles: [Role.User, Role.Agent, Role.CompanyAdmin]
    });
  }
}
