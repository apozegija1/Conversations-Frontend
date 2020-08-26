import {Component, Input, Output} from '@angular/core';

import {EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-revealable-password',
    templateUrl: './revealable-password.component.html'
})
export class RevealablePasswordComponent {
  public hide = true;

  @Input() parentForm: FormGroup;
}
