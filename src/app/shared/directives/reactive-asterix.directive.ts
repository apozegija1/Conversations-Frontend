/**
 * Input/Select into FormField consider Validator.required from reactive form if the [required] attribute is missing in the template
 */
import {AfterContentChecked, Directive} from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {MatSelect} from '@angular/material/select';
import {MatInput} from '@angular/material/input';
import {AbstractControl} from '@angular/forms';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'mat-form-field:has(input:not([required])), mat-form-field:has(mat-select:not([required]))',
})
export class ReactiveAsteriskDirective implements AfterContentChecked {
  constructor(private matFormField: MatFormField) {}

  ngAfterContentChecked() {
    const ctrl = this.matFormField._control;
    if (ctrl instanceof MatInput || ctrl instanceof MatSelect) {
      ctrl.required = ctrl.ngControl?.control?.validator?.({} as AbstractControl)?.required;
    }
  }
}
