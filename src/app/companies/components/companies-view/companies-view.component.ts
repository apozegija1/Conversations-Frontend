import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BaseViewForm} from '../../../shared/classes/base-view-form';

@Component({
    templateUrl: 'companies-view.component.html',
    styleUrls: ['./companies-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CompaniesViewComponent extends BaseViewForm implements OnInit {
  constructor(route: ActivatedRoute) {
    super(route);
  }

  ngOnInit() {

  }
}
