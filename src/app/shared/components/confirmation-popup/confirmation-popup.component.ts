import { Component, OnInit, Inject } from '@angular/core';
import { ConfirmationModel } from '../../models/confimation-popup.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.css']
})
export class ConfirmationPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmationPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ConfirmationModel) { }

  ngOnInit() {
  }

  public onNoClick() {
    this.dialogRef.close(false);
  }

  public confirm() {
    this.dialogRef.close(true);
  }
}
