import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';

import {AuthenticationService} from '../../../auth/services/authentication.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from '../../services/local-storage.service';
import {SubSink} from '../../classes/sub-sink';
import {NavbarService} from '../../services/navbar.service';
import {IUser} from '../../../users/models/iuser.interface';
import {INavbarMenu} from '../../models/interfaces/inavbar-menu.interface';
import {Role} from '../../../users/models/role.enum';
import {MenuItemType} from '../../models/enums/menu-item-type.enum';
import {MenuStateType} from '../../models/enums/menu-state-type.enum';
import {Constants} from '../../models/constants';

@Component({
    templateUrl: 'navbar.component.html',
    selector: 'app-navbar',
    styleUrls: ['./navbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
// Need to register navbar service so each component can register navbar elements
export class NavbarComponent implements OnInit, OnDestroy {
    public isLoggedIn = false;
    private subsink = new SubSink();

    public navbarMenu: INavbarMenu;
    public currentUser: IUser;

    constructor(private authService: AuthenticationService,
                private router: Router,
                private translate: TranslateService,
                private localStorageService: LocalStorageService,
                private navbarService: NavbarService,
                private cdr: ChangeDetectorRef) {}

    ngOnInit() {
      this.isLoggedIn = this.authService.isLoggedIn !== false;
      this.currentUser = this.authService.getCurrentUser();
      this.setRoleBasedLinks();

      this.subsink.sink = this.authService.getIsUserLoggedIn()
        .subscribe((data) => {
          this.isLoggedIn = data;
          this.setRoleBasedLinks();
          // As we use primitive type flag isLoggedIn we need to manually run change detection after we improve data
          this.cdr.detectChanges();
        });
    }

    ngOnDestroy() {
      this.subsink.unsubscribe();
    }

    public logout() {
      this.authService.logout();
      this.navbarMenu = this.navbarService.clear();
      this.router.navigate(['/login']);
    }

    public setRoleBasedLinks(): void {
      this.navbarMenu = this.navbarService.getMenu(Constants.Menu.defaultTopMenuName);
      if (this.isLoggedIn && this.navbarService.isEmpty()) {
        this.addUsersMenu();
        this.addCompaniesMenu();
        this.addCommunicationsMenu();
      }
    }

    private addUsersMenu() {
      this.navbarService.addMenuItem(Constants.Menu.defaultTopMenuName, {
        icon: 'supervised_user_circle',
        title: 'users_label',
        state: MenuStateType.Users,
        type: MenuItemType.Dropdown,
        roles: [Role.Admin]
      });

      this.navbarService.addSubMenuItem(Constants.Menu.defaultTopMenuName, MenuStateType.Users, {
        title: 'users_list_label',
        path: '/users',
        state: MenuStateType.Users,
        roles: [Role.Admin]
      });

      this.navbarService.addSubMenuItem(Constants.Menu.defaultTopMenuName, MenuStateType.Users, {
        title: 'users_create_label',
        path: '/users/create',
        state: MenuStateType.Users,
        roles: [Role.Admin]
      });
    }

    private addCompaniesMenu() {
      this.navbarService.addMenuItem(Constants.Menu.defaultTopMenuName, {
        icon: 'business',
        title: 'companies_label',
        state: MenuStateType.Companies,
        type: MenuItemType.Dropdown,
        roles: [Role.Admin]
      });

      this.navbarService.addSubMenuItem(Constants.Menu.defaultTopMenuName, MenuStateType.Companies, {
        title: 'companies_list_label',
        path: '/companies/list',
        state: MenuStateType.Companies,
        roles: [Role.Admin]
      });

      this.navbarService.addSubMenuItem(Constants.Menu.defaultTopMenuName, MenuStateType.Companies, {
        title: 'companies_create_label',
        path: '/companies/create',
        state: MenuStateType.Companies,
        roles: [Role.Admin]
      });
    }

  private addCommunicationsMenu() {
    this.navbarService.addMenuItem(Constants.Menu.defaultTopMenuName, {
      icon: 'phone_in_talk',
      title: 'communications_label',
      path: '/communications',
      state: MenuStateType.Communications,
      roles: [Role.Admin, Role.User, Role.Agent, Role.CompanyAdmin]
    });
  }
}
