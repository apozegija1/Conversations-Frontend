import {Component, Inject, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RtcVideoPopupComponent} from '../rtc-video-popup/rtc-video-popup.component';
import {IPopupData} from '../../models/interfaces/ipopup-data.interface';
import {DialogPopupService} from '../../services/dialog-popup.service';
import {TranslateService} from '@ngx-translate/core';
import {ConfirmationModel} from '../../models/confimation-popup.model';
import {BaseSubscription} from '../../classes/base-subscription';
import {IDialogCloseData} from '../../models/interfaces/idialog-close-data.interface';

@Component({
  templateUrl: './incoming-call-popup.component.html',
  styleUrls: ['./incoming-call-popup.scss']
})
export class IncomingCallPopupComponent extends BaseSubscription implements  OnDestroy{

  constructor(public dialogRef: MatDialogRef<IncomingCallPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ConfirmationModel,
              private dialogPopupService: DialogPopupService,
              private translate: TranslateService) {
    super();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

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

    this.sink = this.dialogPopupService.processPopup(RtcVideoPopupComponent, popupData)
      .subscribe((data: IDialogCloseData) => {});

    // User accepted incoming call
    this.data.customData.accept();
    this.dialogRef.close();
  }
}
