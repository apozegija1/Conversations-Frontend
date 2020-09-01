import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../auth/services/authentication.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from '../../services/local-storage.service';
import {SubSink} from '../../classes/sub-sink';
import {NavbarService} from '../../services/navbar.service';
import {INavbarMenu} from '../../models/interfaces/inavbar-menu.interface';
import {Role} from '../../../users/models/role.enum';
import {MenuItemType} from '../../models/enums/menu-item-type.enum';
import {MenuStateType} from '../../models/enums/menu-state-type.enum';
import {Constants} from '../../models/constants';
import {BehaviorSubject} from 'rxjs';
import {BaseUserInfo} from '../../classes/base-user-info';

@Component({
    templateUrl: 'navbar.component.html',
    selector: 'app-navbar',
    styleUrls: ['./navbar.component.scss']
})
// Need to register navbar service so each component can register navbar elements
export class NavbarComponent extends BaseUserInfo implements OnInit, OnDestroy {
    public isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    private subsink = new SubSink();

    public navbarMenu: INavbarMenu;

    constructor(authService: AuthenticationService,
                private router: Router,
                private translate: TranslateService,
                private localStorageService: LocalStorageService,
                private navbarService: NavbarService) {
      super(authService);
    }

    ngOnInit() {
      // Assign logged in observable and notify if user logged in
      this.subsink.sink = this.authService.getIsUserLoggedIn()
        .subscribe((data: boolean) => {
          this.setRoleBasedLinks(data);
          if (data === false) {
            this.clearLogoutData();
          }
          this.isLoggedIn$.next(data);
        });

      this.authService.notifyUserLoggedIn(this.authService.isLoggedIn !== false);
    }

    ngOnDestroy() {
      this.subsink.unsubscribe();
    }

    private clearLogoutData() {
      this.navbarMenu = this.navbarService.clear();
      this.currentUser = null;
      this.router.navigate(['/login']);
    }

    public logout = () => {
      this.authService.logout();
    }

    public setRoleBasedLinks(isLoggedIn: boolean): void {
      if (isLoggedIn) {
        this.setCurrentUser();
        if (this.navbarService.isEmpty()) {
          this.addDashboardMenu();
          this.addUsersMenu();
          this.addCompaniesMenu();
          this.addCommunicationsMenu();
          this.addAuthMenu();
        }
        this.navbarMenu = this.navbarService.getMenu(Constants.Menu.defaultTopMenuName);
      } else {
        this.navbarMenu = this.navbarService.clear();
      }
    }

    private addUsersMenu() {
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
        state: MenuStateType.Users,
        roles: [Role.Admin, Role.CompanyAdmin]
      });

      this.navbarService.addSubMenuItem(Constants.Menu.defaultTopMenuName, MenuStateType.Users, {
        title: 'users_create_label',
        path: '/users/create',
        state: MenuStateType.Users,
        roles: [Role.Admin, Role.CompanyAdmin]
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
        path: '/companies',
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
      roles: [Role.User, Role.Agent, Role.CompanyAdmin]
    });
  }

  private addDashboardMenu() {
    this.navbarService.addMenuItem(Constants.Menu.defaultTopMenuName, {
      icon: 'home',
      title: 'home_label',
      path: '/',
      state: MenuStateType.Dashboard,
      roles: ['*']
    });
  }

  private addAuthMenu() {
    this.navbarService.addMenuItem(Constants.Menu.defaultTopMenuName, {
      icon: 'person_pin',
      title: this.currentUser.username,
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
}
