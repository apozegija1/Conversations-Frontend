import {FormMode} from '../models/enums/form-mode.enum';
import {ActivatedRoute} from '@angular/router';
import {BaseSubscription} from './base-subscription';

export class BaseEditForm extends BaseSubscription {
  public id: number;
  public formMode = FormMode.Edit;

  constructor(private route: ActivatedRoute) {
    super();
    this.sink = this.route.params.subscribe(params => this.id = +params.id);
  }
}
