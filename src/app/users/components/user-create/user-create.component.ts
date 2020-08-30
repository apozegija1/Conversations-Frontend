import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
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
import {IUser} from '../../models/iuser.interface';
import {AuthenticationService} from '../../../auth/services/authentication.service';

@Component({
    templateUrl: 'user-create.component.html',
    selector: 'app-user-create',
    styleUrls: ['./user-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserCreateComponent implements OnInit {
  form: FormGroup;
  public roles$: Observable<IRole[]>;
  public companies$: Observable<ICompany[]>;

  constructor(private userApiService: UserApiService,
              private roleApiService: RoleApiService,
              private companyApiService: CompanyApiService,
              private alertService: AlertService,
              private translateService: TranslateService,
              private authenticationService: AuthenticationService,
              fb: FormBuilder) {

    this.form = fb.group({
      ...FormUtils.getUserCreateFormConfig(),
      role: ['',  Validators.required],
      company: ['']
    });
  }

  ngOnInit() {
    this.roles$ = this.roleApiService.get()
      .pipe(map((data: IRole[]) => data));

    this.companies$ = this.companyApiService.getAll()
      .pipe(map((data: ICompany[]) => data));

    this.companies$.subscribe((data) => {
      this.setUserCompany();
    });
  }

  get companyFormField(): AbstractControl {
    return this.form.get('company');
  }

  createUser(): void {
    // Need to read raw value because of readonly disabled field
    const formValue = {...this.form.getRawValue()};
    const user = {...formValue};
    user.company = { id: formValue.company, name: '' };

    this.userApiService.createUserWithRole(user, this.form.value.role)
      .subscribe(
        () => {
          this.alertService.success(this.translateService.instant('user_created_label_message'));
          this.form.reset();
          // Need to set user company after form reset as user can't select this one
          this.setUserCompany();
        },
        (error: HttpErrorResponse) => {
          this.alertService.error(error.error.message);
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
