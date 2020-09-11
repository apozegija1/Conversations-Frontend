import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CompanyApiService} from '../../services/company-api.service';
import {AlertService} from '../../../shared/services/alert.service';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse} from '@angular/common/http';
import {BaseFormComponent} from '../../../shared/components/base-form/base-form.component';
import {IUser} from '../../../users/models/iuser.interface';
import {ICompany} from '../../models/icompany.interface';

@Component({
  templateUrl: './companies-form.component.html',
  selector: 'app-companies-form',
  styleUrls: ['./companies-form.component.scss']
})

export class CompaniesFormComponent extends BaseFormComponent implements OnInit {
  constructor(private companyApiService: CompanyApiService,
              private alertService: AlertService,
              private translateService: TranslateService,
              private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    if (this.isEditMode) {
      this.formLabel = {
        btn: 'edit_label',
        success: 'company_edited_label_message',
        title: 'edit_company_label'
      };
    } else if (this.isCreateMode) {
      this.formLabel = {
        btn: 'create_label',
        success: 'company_created_label_message',
        title: 'create_company_label'
      };
    } else if (this.isViewMode) {
      this.formLabel = {
        btn: null,
        success: null,
        title: 'view_company_label'
      };
      this.isReadonly = true;
    }

    this.setFormValues();

    // If there is id get data for user
    if (this.id) {
      this.subSink.sink = this.companyApiService.getById(this.id)
        .subscribe((company: ICompany) => {
          this.setFormValues(company);
        });
    }
  }

  createOrUpdateCompany() {
    const formValue = {...this.form.getRawValue()};
    const company: ICompany = {...formValue};
    let companyCreateOrEdit$;

    if (this.isEditMode) {
      company.id = this.id;
      companyCreateOrEdit$ = this.companyApiService.update(company);
    } else {
      companyCreateOrEdit$ = this.companyApiService.create(company);
    }

    companyCreateOrEdit$
      .subscribe(
        () => {
          this.alertService.success(this.translateService.instant(this.formLabel.success));
          this.form.reset();
        }, (error: HttpErrorResponse) => {
          this.alertService.error(error.error.message);
        });
  }

  private setFormValues(company?: ICompany) {
    let name = '', address = '';
    if (company) {
      name = company.name;
      address = company.address;
    }

    this.form = this.fb.group({
      name: [{value: name, disabled: this.isReadonly},  Validators.required],
      address: [{value: address, disabled: this.isReadonly}]
    });
  }
}
