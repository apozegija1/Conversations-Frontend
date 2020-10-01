import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BaseViewForm} from '../../../shared/classes/base-view-form';

@Component({
  templateUrl: 'users-view.component.html',
  styleUrls: ['./users-view.component.scss']
})

export class UsersViewComponent extends BaseViewForm implements OnDestroy {
  constructor(route: ActivatedRoute) {
    super(route);
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
