import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BaseEditForm} from '../../../shared/classes/base-edit-form';

@Component({
    templateUrl: 'users-edit.component.html',
    styleUrls: ['./users-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersEditComponent extends BaseEditForm implements OnInit {

  constructor(route: ActivatedRoute) {
    super(route);
  }

  ngOnInit() {

  }
}
