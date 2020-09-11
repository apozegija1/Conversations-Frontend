import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BaseCreateForm} from '../../../shared/classes/base-create-form';

@Component({
    templateUrl: 'user-create.component.html',
    styleUrls: ['./user-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserCreateComponent extends BaseCreateForm implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {

  }
}
