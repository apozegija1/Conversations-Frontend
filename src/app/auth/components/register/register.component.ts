import {ChangeDetectionStrategy, Component} from '@angular/core';
import { Router } from '@angular/router';
import {AlertService} from '../../../shared/services/alert.service';
import {IUser} from '../../../users/models/iuser.interface';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationApiService} from '../../services/authentication-api.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    templateUrl: './register.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class RegisterComponent {
    model: IUser = {
      id: '',
      username: '',
      firstname: '',
      lastname: '',
      password: '',
      email: '',
      phone: null,
      roles: [],
      gender: null
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
                (error: HttpErrorResponse) => {
                    this.alertService.error(error.error.message);
                });
    }
}
