import {ChangeDetectionStrategy, Component} from '@angular/core';
import { Router } from '@angular/router';
import {AlertService} from '../../../shared/services/alert.service';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationApiService} from '../../services/authentication-api.service';
import {HttpErrorResponse} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidatorHelper} from '../../../shared/helpers/validator.helper';

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
        username: ['', ValidatorHelper.getUsernameValidators()],
        password: ['', ValidatorHelper.getPasswordValidators()],
        firstname: ['', ValidatorHelper.getNameValidators()],
        lastname: ['', ValidatorHelper.getNameValidators()],
        email: ['', ValidatorHelper.getEmailValidators()],
        phone: [null, Validators.pattern(new RegExp('[0-9 ]{12}'))],
        gender: [null]
      });
    }

    register() {
        this.authenticationApiService.register(this.form.value)
            .subscribe(
                () => {
                    this.alertService.success(this.translateService.instant('registration_success'), true);
                    this.router.navigate(['/login']);
                },
                (error: HttpErrorResponse) => {
                    this.alertService.error(error.error.message);
                });
    }
}
