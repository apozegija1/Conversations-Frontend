import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {VideoPopupComponent} from '../video-popup/video-popup.component';
import {IPopupData} from '../../../shared/models/interfaces/ipopup-data.interface';
import {DialogPopupService} from '../../../shared/services/dialog-popup.service';
import {TranslateService} from '@ngx-translate/core';
import {IUserCommunication} from '../../models/iuser-communication.interface';
import {AuthenticationService} from '../../../auth/services/authentication.service';

@Component({
  templateUrl: './incoming-call-popup.component.html',
  styleUrls: ['./incoming-call-popup.css']
})
export class IncomingCallPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<IncomingCallPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogPopupService: DialogPopupService,
    private translate: TranslateService,
    private authenticationService: AuthenticationService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    const popupData: IPopupData = {
      title: this.translate.instant('in_video_call'),
      content: '',
      okDialogTitle: 'finish_call',
      data: this.authenticationService.getCurrentUser() // Because it is incoming call, data.toUser is current user
    };
    this.dialogPopupService.processPopup(VideoPopupComponent, popupData)
      .subscribe((ok: boolean) => {
        if (!ok) {
          return;
        }
      });
    this.dialogRef.close();
  }

  ngOnInit() {}
}
