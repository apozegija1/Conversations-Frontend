import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CompanyApiService} from '../../services/company-api.service';
import {AlertService} from '../../../shared/services/alert.service';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    templateUrl: './companies-create.component.html',
    styleUrls: ['./companies-create.component.scss']
})

export class CompaniesCreateComponent implements OnInit {
  form: FormGroup;

  constructor(private companyApiService: CompanyApiService,
              private alertService: AlertService,
              private translateService: TranslateService,
              fb: FormBuilder) {
    this.form = fb.group({
      name: ['',  Validators.required],
      address: ['']
    });
  }

  ngOnInit() {

  }

  createCompany() {
    this.companyApiService.create(this.form.value)
      .subscribe(
        () => {
          this.alertService.success(this.translateService.instant('company_created_label_message'));
          this.form.reset();
        },
        (error: HttpErrorResponse) => {
          this.alertService.error(error.error.message);
        });
  }
}
