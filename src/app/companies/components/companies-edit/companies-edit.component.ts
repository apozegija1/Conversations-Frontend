import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BaseEditForm} from '../../../shared/classes/base-edit-form';

@Component({
    templateUrl: 'companies-edit.component.html',
    styleUrls: ['./companies-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompaniesEditComponent extends BaseEditForm implements OnDestroy {
  constructor(route: ActivatedRoute) {
    super(route);
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
