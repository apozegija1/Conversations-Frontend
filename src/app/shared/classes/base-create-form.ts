import {FormMode} from '../models/enums/form-mode.enum';
import {ActivatedRoute} from '@angular/router';

export class BaseCreateForm {
  public formMode = FormMode.View;

  constructor() {

  }
}
