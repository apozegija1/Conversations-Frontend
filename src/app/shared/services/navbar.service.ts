import { Injectable } from '@angular/core';
import {INavbarMenu} from '../models/interfaces/inavbar-menu.interface';
import {Role} from '../../users/models/role.enum';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  defaultRoles: [Role.User, Role.Admin];
  menus: {[key: string]: INavbarMenu } = {};

  // Add new menu object by menu id
   addMenu(menuId, options) {
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
   addMenuItem(menuId, options) {
    // Validate that the menu exists
     this.validateMenuExistence(menuId);

     options = options || {};

    // Push new menu item
     this.menus[menuId].items.push({
      title: options.title || '',
      state: options.state || '',
      type: options.type || 'item',
      class: options.class,
      roles: ((options.roles === null || typeof options.roles === 'undefined') ? this.defaultRoles : options.roles),
      position: options.position || 0,
      items: [],
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
   addSubMenuItem(menuId, parentItemState, options) {
    options = options || {};

    // Validate that the menu exists
    this.validateMenuExistence(menuId);

    // Search for menu item
    this.menus[menuId].items.filter((item) => {
      return item.state === parentItemState;
    }).forEach((item) => {
      item.items.push({
        title: options.title || '',
        state: options.state || '',
        params: options.params || {},
        roles: ((options.roles === null || typeof options.roles === 'undefined') ? item.roles : options.roles),
        position: options.position || 0,
        shouldRender: this.shouldRender
      });
    });

    // Return the menu object
    return this.menus[menuId];
  }

  // Get the menu object by menu id
   getMenu(menuId) {
    // Validate that the menu exists
     this.validateMenuExistence(menuId);

    // Return the menu object
     return this.menus[menuId];
  }

   init() {
    // Adding the topbar menu
    this.addMenu('topbar', {
      roles: ['*']
    });
  }

  shouldRender = function(user) {
    if (this.roles.indexOf('*') !== -1) {
      return true;
    }

    if (!user) {
      return false;
    }

    const matchingRoles = user.roles.filter(function(userRole) {
      return this.roles.indexOf(userRole) !== -1;
    }, this);

    return matchingRoles.length > 0;
  };

  // Remove existing menu object by menu id
   removeMenu(menuId) {
    // Validate that the menu exists
    this.validateMenuExistence(menuId);

    delete this.menus[menuId];
  }

  // Remove existing menu object by menu id
   removeMenuItem(menuId, menuItemState) {
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
  removeSubMenuItem(menuId, subMenuItemState) {
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

  // Validate menu existence
   validateMenuExistence(menuId) {
    if (!(menuId && menuId.length)) {
      throw new Error('MenuId was not provided');
    }
    if (!this.menus[menuId]) {
      throw new Error('Menu does not exist');
    }
    return true;
  }
}


/**
 * Usage
 *     menuService.addMenuItem('topbar', {
      title: 'Kvizovi',
      state: 'questionnaires',
      type: 'dropdown',
      roles: ['admin']
    });

 menuService.addSubMenuItem('topbar', 'questionnaires', {
      title: 'Lista kvizova',
      state: 'questionnaires.list',
      roles: ['admin']
    });

 menuService.addSubMenuItem('topbar', 'questionnaires', {
      title: 'Kreiraj kviz',
      state: 'questionnaires.create',
      roles: ['admin']
    });
 * */
