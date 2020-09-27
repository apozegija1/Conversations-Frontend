import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../auth/services/authentication.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from '../../services/local-storage.service';
import {NavbarService} from '../../services/navbar/navbar.service';
import {INavbarMenu} from '../../models/interfaces/inavbar-menu.interface';
import {Constants} from '../../models/constants';
import {BehaviorSubject} from 'rxjs';
import {BaseUserInfo} from '../../classes/base-user-info';
import {EnumUtils} from '../../utils/enum.utils';
import {INavbarMenuItem} from '../../models/interfaces/inavbar-menu-item.interface';
import {UsersNavbarService} from '../../../users/services/users-navbar.service';
import {AuthNavbarService} from '../../../auth/services/auth-navbar.service';
import {DashboardNavbarService} from '../../../dashboard/services/dashboard-navbar.service';
import {CompaniesNavbarService} from '../../../companies/services/companies-navbar.service';
import {CommunicationsNavbarService} from '../../../communications/services/communications-navbar.service';
import {WebrtcService} from '../../services/webrtc.service';
import {ReportsNavbarService} from '../../../reports/services/reports-navbar.service';

@Component({
    templateUrl: 'navbar.component.html',
    selector: 'app-navbar',
    styleUrls: ['./navbar.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
// Need to register navbar service so each component can register navbar elements
export class NavbarComponent extends BaseUserInfo implements OnInit, OnDestroy {
  public isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public menuItemTypes = EnumUtils.getMenuItemTypeConstants();

  public navbarMenu: INavbarMenu;
  // Flattened menu on smaller screen
  public navbarMenuSmFlat: INavbarMenuItem[];

  constructor(authService: AuthenticationService,
              private router: Router,
              private translate: TranslateService,
              private localStorageService: LocalStorageService,
              private webrtcService: WebrtcService,
              private navbarService: NavbarService,
              private usersNavbarService: UsersNavbarService,
              private authNavbarService: AuthNavbarService,
              private dashboardNavbarService: DashboardNavbarService,
              private companiesNavbarService: CompaniesNavbarService,
              private communicationsNavbarService: CommunicationsNavbarService,
              private reportsNavbarService: ReportsNavbarService) {
    super(authService);
  }

  ngOnInit() {
    this.webrtcService.init();
    // Assign logged in observable and notify if user logged in
    this.sink = this.authService.getIsUserLoggedIn()
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
    this.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event) {
    if (event.target.innerWidth < 960) {
      this.assignSmMenu();
    } else {
      this.clearSmMenu();
    }
  }

  private clearLogoutData() {
    this.clearMenu();
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  public setRoleBasedLinks(isLoggedIn: boolean): void {
    if (isLoggedIn) {
      this.setCurrentUser();
      if (this.navbarService.isEmpty()) {
        this.dashboardNavbarService.addMenu();
        this.usersNavbarService.addMenu();
        this.companiesNavbarService.addMenu();
        this.communicationsNavbarService.addMenu();
        this.reportsNavbarService.addMenu();
        this.authNavbarService.addMenu(this.currentUser);
      }
      this.assignMenu();
    } else {
      this.clearMenu();
    }
  }

  private assignMenu() {
    this.assignNavbarMenu();
    this.assignSmMenu();
  }

  private assignNavbarMenu() {
    this.navbarMenu = (this.navbarService.getMenu(Constants.Menu.defaultTopMenuName));
  }

  private assignSmMenu() {
    this.navbarMenuSmFlat = (this.navbarService.getMenuFlattened(Constants.Menu.defaultTopMenuName));
  }

  private clearMenu() {
    this.navbarMenu = (this.navbarService.clear());
    this.clearSmMenu();
  }

  private clearSmMenu() {
    this.navbarMenuSmFlat = ([]);
  }
}
