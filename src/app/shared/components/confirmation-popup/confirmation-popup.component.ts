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

  constructor(public dialogRef: MatDialogRef<ConfirmationPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ConfirmationModel) { }

  ngOnInit() {
  }

  public onNoClick() {
    this.closeChange.emit();
    this.dialogRef.close(false);
  }

  public confirm() {
    this.saveChange.emit();
    this.dialogRef.close(true);
  }
}
