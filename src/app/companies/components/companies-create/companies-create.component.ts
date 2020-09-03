import { Component, OnInit } from '@angular/core';
import {BaseCreateForm} from '../../../shared/classes/base-create-form';

@Component({
    templateUrl: './companies-create.component.html',
    styleUrls: ['./companies-create.component.scss']
})

export class CompaniesCreateComponent extends BaseCreateForm implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {

  }
}
