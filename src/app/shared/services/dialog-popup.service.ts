import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {ConfirmationModel} from '../models/confimation-popup.model';

@Injectable({
  providedIn: 'root'
})
export class DialogPopupService {

  constructor(private dialog: MatDialog) { }

  public processPopup(component: any, title: string,
                      content: string, okDialogTitle?: string): any {
    const data: ConfirmationModel = {
      title,
      content,
      oneBtn: okDialogTitle != null,
      oneBtnTitle: okDialogTitle
    };

    const dialogRef = this.dialog.open(component, {
      width: '850px',
      disableClose: true,
      data
    });
    return dialogRef.afterClosed();
  }
}
