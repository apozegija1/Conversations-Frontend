import {Component, Input, Output} from '@angular/core';

import {EventEmitter} from '@angular/core';

@Component({
    selector: 'app-revealable-password',
    templateUrl: './revealable-password.component.html'
})
export class RevealablePasswordComponent {
  hide = true;
  @Input() password: string;

  @Output() passwordChange = new EventEmitter<string>();

  change() {
    this.passwordChange.emit(this.password);
  }
}
