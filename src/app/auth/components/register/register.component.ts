import {ChangeDetectionStrategy, Component} from '@angular/core';
import { Router } from '@angular/router';
import {AlertService} from '../../../shared/services/alert.service';
import {IUser} from '../../../users/models/iuser.interface';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationApiService} from '../../services/authentication-api.service';

@Component({
    templateUrl: './register.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class RegisterComponent {
    model: IUser = {
      id: '',
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      phone: '',
      roles: [],
      gender: ''
    };

    constructor(
        private router: Router,
        private authenticationApiService: AuthenticationApiService,
        private alertService: AlertService,
        private translateService: TranslateService) { }

    register() {
        this.authenticationApiService.register(this.model)
            .subscribe(
                data => {
                    this.alertService.success(this.translateService.instant('registration_success'), true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                });
    }
}
