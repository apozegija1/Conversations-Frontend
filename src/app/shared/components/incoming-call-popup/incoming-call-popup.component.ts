import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RtcVideoPopupComponent} from '../rtc-video-popup/rtc-video-popup.component';
import {IPopupData} from '../../models/interfaces/ipopup-data.interface';
import {DialogPopupService} from '../../services/dialog-popup.service';
import {TranslateService} from '@ngx-translate/core';
import {ConfirmationModel} from '../../models/confimation-popup.model';

@Component({
  templateUrl: './incoming-call-popup.component.html',
  styleUrls: ['./incoming-call-popup.scss']
})
export class IncomingCallPopupComponent {

  constructor(public dialogRef: MatDialogRef<IncomingCallPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ConfirmationModel,
              private dialogPopupService: DialogPopupService,
              private translate: TranslateService) {}

  onNoClick(): void {
    // User rejected incoming call
    this.data.customData.decline();
    this.dialogRef.close();
  }

  onYesClick(): void {
    const popupData: IPopupData = {
      title: this.translate.instant('in_video_call'),
      content: '',
      okDialogTitle: 'finish_call',
      data: null
    };

    this.dialogPopupService.processPopup(RtcVideoPopupComponent, popupData)
      .subscribe((ok: boolean) => {
        if (!ok) {

          return;
        }
      });

    // User accepted incoming call
    this.data.customData.accept();
    this.dialogRef.close();
  }
}
