import {Injectable} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {ConfirmationModel} from '../models/confimation-popup.model';
import {IPopupData} from '../models/interfaces/ipopup-data.interface';

@Injectable({
  providedIn: 'root'
})
export class DialogPopupService {

  constructor(private dialog: MatDialog) { }

  public processPopup(component: any, popupData: IPopupData): any {
    const data: ConfirmationModel = {
      title: popupData.title,
      content: popupData.content,
      oneBtn: popupData.okDialogTitle != null,
      oneBtnTitle: popupData.okDialogTitle,
      customData: popupData.data
    };

    const dialogRef = this.dialog.open(component, {
      width: popupData.width ? `${popupData.width}px` : '850px',
      disableClose: true,
      data
    });
    return dialogRef.afterClosed();
  }
}
