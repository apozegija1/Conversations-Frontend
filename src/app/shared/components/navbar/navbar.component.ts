import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';

import {AuthenticationService} from '../../../auth/services/authentication.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Constants} from '../../models/constants';
import {LocalStorageService} from '../../services/local-storage.service';
import {SubSink} from '../../sub-sink';
import {INavbarLinkInterface} from '../../models/interfaces/inavbar-link.interface';

@Component({
    templateUrl: 'navbar.component.html',
    selector: 'app-navbar',
    styleUrls: ['./navbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
// Need to register navbar service so each component can register navbar elements
export class NavbarComponent implements OnInit, OnDestroy {
    public isLoggedIn = false;
    subsink = new SubSink();

    public roleBasedLinks: Array<INavbarLinkInterface> = [];

    constructor(private authService: AuthenticationService,
                private router: Router,
                private translate: TranslateService,
                private localStorageService: LocalStorageService) {}

    ngOnInit() {
      this.isLoggedIn = this.authService.isLoggedIn !== false;
      this.setRoleBasedLinks();
      // tslint:disable-next-line:no-console
      this.subsink.sink = this.authService.getIsUserLoggedIn()
        .subscribe((data) => {
          this.isLoggedIn = data;
          this.setRoleBasedLinks();
        });
    }

    ngOnDestroy() {
      this.subsink.unsubscribe();
    }

    public logout() {
      this.authService.logout();
      this.router.navigate(['/login']);
    }

    public selectLanguage(language: string) {
      this.localStorageService.setItem(Constants.LocalStorageKey.LanguageSelected, language);
      this.translate.setDefaultLang(language);
    }

    public setRoleBasedLinks(): void {
      this.roleBasedLinks = this.getRoleBasedLinks();
    }

    public getRoleBasedLinks(): Array<INavbarLinkInterface> {
      if (this.isLoggedIn && this.roleBasedLinks.length === 0) {
        if (this.authService.isSuperAdmin()) {
          return [
            {
              icon: 'supervised_user_circle',
              text: 'users_label',
              path: '/users'
            },
            {
              icon: 'business',
              text: 'companies_label',
              path: '/companies'
            },
            {
              icon: 'phone_in_talk',
              text: 'communications_label',
              path: '/communications'
            }
          ];
        } else if (this.authService.isCompanyAdmin()) {
          return [

          ];
        } else if (this.authService.isAgent()) {
          return [

          ];
        } else if (this.authService.isUser()) {
          return [

          ];
        }
      }
      return [];
    }
}
