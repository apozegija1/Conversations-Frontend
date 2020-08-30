import { Injectable } from '@angular/core';
import {INavbarMenu} from '../models/interfaces/inavbar-menu.interface';
import {Role} from '../../users/models/role.enum';
import {IUser} from '../../users/models/iuser.interface';
import {INavbarMenuItem} from '../models/interfaces/inavbar-menu-item.interface';
import {MenuItemType} from '../models/enums/menu-item-type.enum';
import {Constants} from '../models/constants';
import {IRole} from '../../users/models/irole.interface';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private defaultRoles: string[] =  [Role.User, Role.Admin];
  private menus: {[key: string]: INavbarMenu } = {};

  constructor() {
    this.init();
  }

  // Add new menu object by menu id
  addMenu(menuId: string, options: any): INavbarMenu {
    options = options || {};

    // Create the new menu
    this.menus[menuId] = {
      roles: options.roles || this.defaultRoles,
      items: options.items || [],
      shouldRender: this.shouldRender
    };

    // Return the menu object
    return this.menus[menuId];
  }

  // Add menu item object
   addMenuItem(menuId: string, menuOptions: INavbarMenuItem): INavbarMenu {
    // Validate that the menu exists
     this.validateMenuExistence(menuId);

     const options: any = menuOptions || {};

    // Push new menu item
     this.menus[menuId].items.push({
        title: options.title || '',
        state: options.state || '',
        type: options.type || MenuItemType.Item,
        class: options.class,
        icon: options.icon,
        path: options.path || '',
        roles: ((options.roles === null || typeof options.roles === 'undefined') ? this.defaultRoles : options.roles),
        position: options.position || 0,
        items: [],
        isRightSideDivider: options.isRightSideDivider || false,
        method: options.method || null,
        shouldRender: this.shouldRender
    });

    // Add submenu items
     if (options.items) {
      options.items.forEach((subMenuItem) => {
        this.addSubMenuItem(menuId, options.state, subMenuItem);
      });
    }

    // Return the menu object
     return this.menus[menuId];
  }

  // Add submenu item object
   addSubMenuItem(menuId: string, parentItemState: string, menuOptions: INavbarMenuItem): INavbarMenu {
    const options: any = menuOptions || {};

    // Validate that the menu exists
    this.validateMenuExistence(menuId);

    // Search for menu item
    this.menus[menuId].items.filter((item: INavbarMenuItem) => {
      return item.state === parentItemState;
    }).forEach((item) => {
      item.items.push({
        title: options.title || '',
        state: options.state || '',
        params: options.params || {},
        icon: options.icon,
        path: options.path || '',
        roles: ((options.roles === null || typeof options.roles === 'undefined') ? item.roles : options.roles),
        position: options.position || 0,
        method: options.method || null,
        shouldRender: this.shouldRender
      });
    });

    // Return the menu object
    return this.menus[menuId];
  }

  // Get the menu object by menu id
   getMenu(menuId): INavbarMenu {
    // Validate that the menu exists
     this.validateMenuExistence(menuId);

    // Return the menu object
     return this.menus[menuId];
  }

   init(): INavbarMenu {
    // Adding the topbar menu
    this.addMenu(Constants.Menu.defaultTopMenuName, {
      roles: ['*']
    });

    return this.getMenu(Constants.Menu.defaultTopMenuName);
  }

  isEmpty(): boolean {
    return Object.keys(this.menus).length === 1 && this.getMenu(Constants.Menu.defaultTopMenuName).items.length === 0;
  }

  private shouldRender = function(user?: IUser, from?: string) {
    if (this.roles.indexOf('*') !== -1) {
      return true;
    }

    if (!user) {
      return false;
    }

    const matchingRoles = user.roles.filter((userRole: IRole) => {
      return this.roles.find((menuRole) => menuRole === userRole.name) != null;
    }, this);

    return matchingRoles.length > 0;
  };

  // Remove existing menu object by menu id
  removeMenu(menuId: string): void {
    // Validate that the menu exists
    this.validateMenuExistence(menuId);

    delete this.menus[menuId];
  }

   // Remove existing menu object by menu id
   removeMenuItem(menuId: string, menuItemState: string) {
    // Validate that the menu exists
     this.validateMenuExistence(menuId);

    // Filter out menu items that do not match the current menu item state.
     this.menus[menuId].items = this.menus[menuId].items.filter((item) => {
      return item.state !== menuItemState;
    });

    // Return the menu object
     return this.menus[menuId];
  }

  // Remove existing menu object by menu id
  removeSubMenuItem(menuId: string, subMenuItemState: string) {
    // Validate that the menu exists
    this.validateMenuExistence(menuId);

    // Filter out sub-menu items that do not match the current subMenuItemState
    this.menus[menuId].items.forEach((parentMenuItem) => {
      parentMenuItem.items = parentMenuItem.items.filter((subMenuItem) => {
        return subMenuItem.state !== subMenuItemState;
      });
    });

    // Return the menu object
    return this.menus[menuId];
  }

  clear(): INavbarMenu {
    this.menus = {};
    return this.init();
  }

  // Validate menu existence
   validateMenuExistence(menuId: string) {
    if (!(menuId && menuId.length)) {
      throw new Error('MenuId was not provided');
    }
    if (!this.menus[menuId]) {
      throw new Error('Menu does not exist');
    }
    return true;
  }
}
