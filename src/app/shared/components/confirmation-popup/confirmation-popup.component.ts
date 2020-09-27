import {Component, OnInit, Inject, Output, EventEmitter} from '@angular/core';
import { ConfirmationModel } from '../../models/confimation-popup.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.css']
})
export class ConfirmationPopupComponent implements OnInit {
  @Output() saveChange: EventEmitter<void> = new EventEmitter<void>();

  @Output() closeChange: EventEmitter<void> = new EventEmitter<void>();

  @Output() componentInit: EventEmitter<any> = new EventEmitter<any>();

  constructor(public dialogRef: MatDialogRef<ConfirmationPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ConfirmationModel) { }

  ngOnInit() {
    // Pass values to parent which it can use
    this.componentInit.emit({
      close: this.close
    });
  }

  public onNoClick() {
    this.closeChange.emit();
    this.close(false);
  }

  public confirm() {
    this.saveChange.emit();
    this.close();
  }

  private close = (ok: boolean = true) => {
    this.dialogRef.close(ok);
  }
}
