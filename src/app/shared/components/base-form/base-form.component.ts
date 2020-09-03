import {Component, Input} from '@angular/core';
import {FormMode} from '../../models/enums/form-mode.enum';
import {FormGroup} from '@angular/forms';
import {SubSink} from '../../classes/sub-sink';
import {IFormLabel} from '../../models/interfaces/iform-label.interface';

@Component({
  selector: 'app-base-form',
  template: ``
})
export class BaseFormComponent {
  @Input() formMode: FormMode;
  @Input() id: number;

  public isReadonly = false;

  public form: FormGroup;

  public subSink = new SubSink();

  public formLabel: IFormLabel = {
    btn: '',
    success: '',
    title: ''
  };

  get isEditMode(): boolean {
    return this.formMode === FormMode.Edit;
  }

  get isCreateMode(): boolean {
    return this.formMode === FormMode.Create;
  }

  get isViewMode(): boolean {
    return this.formMode === FormMode.View;
  }
}
