import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {AlertService} from '../../../shared/services/alert.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ValidatorHelper} from '../../../shared/helpers/validator.helper';
import {IAuthLogin} from '../../models/iauth-login.interface';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent implements OnInit {
    returnUrl: string;

    form: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        fb: FormBuilder) {

      this.form = fb.group({
        username: ['', ValidatorHelper.getUsernameValidators()],
        password: ['', ValidatorHelper.getPasswordValidators()],
        rememberMe: [false]
      });
    }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    }

    login() {
        const model: IAuthLogin = this.form.value;
        this.authenticationService.login(model)
            .subscribe(
                data => {
                  this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error.error.error);
                });
    }
}
