import {Component, OnDestroy, OnInit} from '@angular/core';

import {AuthenticationService} from '../../../auth/services/authentication.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Constants} from '../../models/constants';
import {LocalStorageService} from '../../services/local-storage.service';
import {SubSink} from '../../sub-sink';

@Component({
    templateUrl: 'navbar.component.html',
    selector: 'app-navbar',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit, OnDestroy {
    isLoggedIn: boolean;
    subsink = new SubSink();

    constructor(private authService: AuthenticationService,
                private router: Router,
                private translate: TranslateService,
                private localStorageService: LocalStorageService) {}

    ngOnInit() {
      this.isLoggedIn = this.authService.isLoggedIn;
      // tslint:disable-next-line:no-console
      this.subsink.sink = this.authService.getIsUserLoggedIn().subscribe((data) => console.debug('Logged'));
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
}
