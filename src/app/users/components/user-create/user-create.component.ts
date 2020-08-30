import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormUtils} from '../../../shared/utils/form.utils';
import {HttpErrorResponse} from '@angular/common/http';
import {UserApiService} from '../../services/user-api.service';
import {AlertService} from '../../../shared/services/alert.service';
import {TranslateService} from '@ngx-translate/core';
import {RoleApiService} from '../../services/role-api.service';
import {Observable} from 'rxjs';
import {IRole} from '../../models/irole.interface';
import {map} from 'rxjs/operators';

@Component({
    templateUrl: 'user-create.component.html',
    selector: 'app-user-create',
    styleUrls: ['./user-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserCreateComponent implements OnInit {
  form: FormGroup;
  public roles$: Observable<IRole[]>; // = [Role.Admin, Role.CompanyAdmin, Role.User, Role.Agent];

  constructor(private userApiService: UserApiService,
              private roleApiService: RoleApiService,
              private alertService: AlertService,
              private translateService: TranslateService,
              fb: FormBuilder) {

    this.form = fb.group({
      ...FormUtils.getUserCreateFormConfig(),
      role: ['',  Validators.required]
    });
  }

  ngOnInit() {
    this.roles$ = this.roleApiService.get()
      .pipe(map((data: IRole[]) => data));
  }

  createUser(): void {
    this.userApiService.createUserWithRole(this.form.value, this.form.value.role)
      .subscribe(
        () => {
          this.alertService.success(this.translateService.instant('user_create_label_message'));
          this.form.reset();
        },
        (error: HttpErrorResponse) => {
          this.alertService.error(error.error.message);
        });
  }
}
