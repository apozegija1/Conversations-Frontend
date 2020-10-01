import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import {AlertService} from '../../../shared/services/alert.service';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationApiService} from '../../services/authentication-api.service';
import {HttpErrorResponse} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormUtils} from '../../../shared/utils/form.utils';
import {BaseSubscription} from '../../../shared/classes/base-subscription';

@Component({
    templateUrl: './register.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class RegisterComponent extends BaseSubscription implements OnDestroy {
    form: FormGroup;

    constructor(
        private router: Router,
        private authenticationApiService: AuthenticationApiService,
        private alertService: AlertService,
        private translateService: TranslateService,
        fb: FormBuilder) {
      super();
      this.form = fb.group({
        ...FormUtils.getUserCreateFormConfig()
      });
    }

    ngOnDestroy() {
      this.unsubscribe();
    }

  register() {
        this.sink = this.authenticationApiService.register(this.form.value)
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
