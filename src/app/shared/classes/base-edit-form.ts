import {FormMode} from '../models/enums/form-mode.enum';
import {ActivatedRoute} from '@angular/router';

export class BaseEditForm {
  public id: number;
  public formMode = FormMode.Edit;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.id = +params.id);
  }
}
