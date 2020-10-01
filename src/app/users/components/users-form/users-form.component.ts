import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {FormUtils} from '../../../shared/utils/form.utils';
import {HttpErrorResponse} from '@angular/common/http';
import {UserApiService} from '../../services/user-api.service';
import {AlertService} from '../../../shared/services/alert.service';
import {TranslateService} from '@ngx-translate/core';
import {RoleApiService} from '../../services/role-api.service';
import {Observable} from 'rxjs';
import {IRole} from '../../models/irole.interface';
import {map} from 'rxjs/operators';
import {ICompany} from '../../../companies/models/icompany.interface';
import {CompanyApiService} from '../../../companies/services/company-api.service';
import {AuthenticationService} from '../../../auth/services/authentication.service';
import {IUser} from '../../models/iuser.interface';
import {BaseFormComponent} from '../../../shared/components/base-form/base-form.component';

@Component({
    templateUrl: 'users-form.component.html',
    selector: 'app-users-form',
    styleUrls: ['./users-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersFormComponent extends BaseFormComponent implements OnInit, OnDestroy {
  public roles$: Observable<IRole[]>;
  public companies$: Observable<ICompany[]>;

  constructor(private userApiService: UserApiService,
              private roleApiService: RoleApiService,
              private companyApiService: CompanyApiService,
              private alertService: AlertService,
              private translateService: TranslateService,
              private authenticationService: AuthenticationService,
              private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    if (this.isEditMode) {
      this.formLabel = {
        btn: 'edit_label',
        success: 'user_edited_label_message',
        title: 'edit_user_label'
      };
    } else if (this.isCreateMode) {
      this.formLabel = {
        btn: 'create_label',
        success: 'user_created_label_message',
        title: 'create_user_label'
      };
    } else if (this.isViewMode) {
      this.formLabel = {
        btn: null,
        success: null,
        title: 'view_user_label'
      };
      this.isReadonly = true;
    }

    this.setFormValues();

    this.roles$ = this.roleApiService.get()
      .pipe(map((data: IRole[]) => data));

    this.companies$ = this.companyApiService.getAll()
      .pipe(map((data: ICompany[]) => data));

    this.sink = this.companies$.subscribe((data) => {
      this.setUserCompany();
    });

    // If there is id get data for user
    if (this.id) {
      this.sink = this.userApiService.getById(this.id)
        .subscribe((user: IUser) => {
          this.setFormValues(user);
      });
    }
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  get companyFormField(): AbstractControl {
    return this.form.get('company');
  }

  createOrUpdateUser(): void {
    // Need to read raw value because of readonly disabled field
    const formValue = {...this.form.getRawValue()};
    const user: IUser = {...formValue};
    if (formValue.company) {
      user.company = { id: formValue.company, name: '' };
    }

    user.roles = [{ id: formValue.role }];
    let userCreateOrEdit$;

    if (this.isEditMode) {
      user.id = this.id;
      userCreateOrEdit$ = this.userApiService.update(user);
    } else {
      userCreateOrEdit$ = this.userApiService.create(user);
    }

    this.sink = userCreateOrEdit$
      .subscribe(
        () => {
          this.alertService.success(this.translateService.instant(this.formLabel.success));
          if (!this.isEditMode) {
            this.form.reset();
            // Need to set user company after form reset as user can't select this one
            this.setUserCompany();
          }
        }, (error: HttpErrorResponse) => {
          this.alertService.error(error.error.message);
        });
  }

  private setFormValues(user?: IUser) {
    let role: number = null, company: number = null;
    if (user) {
      role = user.roles.length > 0 ? user.roles[0].id : null;
      company = user.company ? user.company.id : null;
    }
    this.form = this.fb.group({
      ...FormUtils.getUserCreateFormConfig(user, this.isReadonly),
      role: [{value: role, disabled: this.isReadonly},  Validators.required],
      company: [{value: company, disabled: this.isReadonly}]
    });
  }

  private setUserCompany() {
    if (this.authenticationService.isCompanyAdmin()) {
      this.companyFormField.setValue(this.authenticationService.getCurrentUser().company.id, {
        onlySelf: true
      });
      this.companyFormField.disable({ onlySelf: true });
    }
  }
}
