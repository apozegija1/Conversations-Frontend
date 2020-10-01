import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {AlertService} from '../../../shared/services/alert.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ValidatorUtils} from '../../../shared/utils/validator.utils';
import {IAuthLogin} from '../../models/iauth-login.interface';
import {IUser} from '../../../users/models/iuser.interface';
import {BaseSubscription} from '../../../shared/classes/base-subscription';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent extends BaseSubscription implements OnInit, OnDestroy {
    returnUrl: string;

    form: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        fb: FormBuilder) {
        super();

        this.form = fb.group({
          username: ['', ValidatorUtils.getUsernameValidators()],
          password: ['', ValidatorUtils.getPasswordValidators()],
          rememberMe: [false]
        });
    }

    ngOnInit() {
        // reset login status
        // this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    }

    ngOnDestroy() {
      this.unsubscribe();
    }

    login() {
        const model: IAuthLogin = this.form.value;
        this.sink = this.authenticationService.login(model)
            .subscribe(
              (_: IUser) => {
                  this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error.error.error);
                });
    }
}
