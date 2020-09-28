import {Component, Input, OnInit} from '@angular/core';
import {VideoPopupComponent} from '../video-popup/video-popup.component';
import {DialogPopupService} from '../../../shared/services/dialog-popup.service';
import {TranslateService} from '@ngx-translate/core';
import {IUserCommunication} from '../../models/iuser-communication.interface';
import {IPopupData} from '../../../shared/models/interfaces/ipopup-data.interface';
import {IncomingCallPopupComponent} from '../incoming-call-popup/incoming-call-popup.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  templateUrl: 'communications-user-header.component.html',
  selector: 'app-communications-user-header',
  styleUrls: ['./communications-user-header.component.scss']
})

export class CommunicationsUserHeaderComponent implements OnInit {
  @Input() selectedConversation: IUserCommunication;

  constructor(private dialogPopupService: DialogPopupService,
              private translate: TranslateService) {
  }

  ngOnInit() {

  }

  startVideoCall() {
    const popupData: IPopupData = {
      title: this.translate.instant('in_video_call'),
      content: '',
      okDialogTitle: 'finish_call',
      data: this.selectedConversation.user
    };
    this.dialogPopupService.processPopup(VideoPopupComponent, popupData)
      .subscribe((ok: boolean) => {
        if (!ok) {
          return;
        }
      });
  }

  acceptCall() {
    const popupData: IPopupData = {
      title: this.translate.instant('incoming_call'),
      content: 'Do you want to except this call?',
      okDialogTitle: 'finish_call',
      data: this.selectedConversation.user
    };
    this.dialogPopupService.processPopup(IncomingCallPopupComponent, popupData)
      .subscribe((ok: boolean) => {
        if (!ok) {
          return;
        }
      });
  }
}
