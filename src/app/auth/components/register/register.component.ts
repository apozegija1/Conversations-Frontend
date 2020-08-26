import {ChangeDetectionStrategy, Component} from '@angular/core';
import { Router } from '@angular/router';
import {AlertService} from '../../../shared/services/alert.service';
import {IUser} from '../../../users/models/iuser.interface';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationApiService} from '../../services/authentication-api.service';
import {HttpErrorResponse} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordStrengthValidator} from '../../../shared/validators/password-strength.validator';

@Component({
    templateUrl: './register.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class RegisterComponent {
    form: FormGroup;

    constructor(
        private router: Router,
        private authenticationApiService: AuthenticationApiService,
        private alertService: AlertService,
        private translateService: TranslateService,
        fb: FormBuilder) {

      this.form = fb.group({
        username: ['', Validators.required, Validators.minLength(3), Validators.maxLength(15)],
        password: ['', [Validators.required, PasswordStrengthValidator]],
        firstname: ['', Validators.required, Validators.minLength(3), Validators.maxLength(15)],
        lastname: ['', Validators.required, Validators.minLength(3), Validators.maxLength(15)],
        email: ['', Validators.email],
        phone: [null],
        gender: [null]
      });
    }

    register() {
        this.authenticationApiService.register(this.form.value)
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
