import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormUtils} from '../../../shared/utils/form.utils';
import {HttpErrorResponse} from '@angular/common/http';
import {UserApiService} from '../../services/user-api.service';
import {AlertService} from '../../../shared/services/alert.service';
import {Role} from '../../models/role.enum';
import {TranslateService} from '@ngx-translate/core';

@Component({
    templateUrl: 'user-create.component.html',
    selector: 'app-user-create',
    styleUrls: ['./user-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserCreateComponent implements OnInit {
  form: FormGroup;
  public roles: [Role.Admin, Role.CompanyAdmin, Role.User, Role.Agent];

  constructor(private userApiService: UserApiService,
              private alertService: AlertService,
              private translateService: TranslateService,
              fb: FormBuilder) {

    this.form = fb.group({
      ...FormUtils.getUserCreateFormConfig(),
      role: ['']
    });
  }

  ngOnInit() {

  }

  register() {
    this.userApiService.createUserWithRole(this.form.value, this.form.value.role)
      .subscribe(
        () => {
          this.alertService.success(this.translateService.instant('user_create_label_message'));
        },
        (error: HttpErrorResponse) => {
          this.alertService.error(error.error.message);
        });
  }
}
