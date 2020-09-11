import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BaseViewForm} from '../../../shared/classes/base-view-form';

@Component({
  templateUrl: 'users-view.component.html',
  styleUrls: ['./users-view.component.scss']
})

export class UsersViewComponent extends BaseViewForm implements OnInit {
  constructor(route: ActivatedRoute) {
    super(route);
  }

  ngOnInit() {
  }
}
