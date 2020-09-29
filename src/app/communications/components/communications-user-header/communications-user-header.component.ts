import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RtcVideoPopupComponent} from '../../../shared/components/rtc-video-popup/rtc-video-popup.component';
import {DialogPopupService} from '../../../shared/services/dialog-popup.service';
import {TranslateService} from '@ngx-translate/core';
import {IUserCommunication} from '../../models/iuser-communication.interface';
import {IPopupData} from '../../../shared/models/interfaces/ipopup-data.interface';
import {IDialogCloseData} from '../../../shared/models/interfaces/idialog-close-data.interface';

@Component({
  templateUrl: 'communications-user-header.component.html',
  selector: 'app-communications-user-header',
  styleUrls: ['./communications-user-header.component.scss']
})

export class CommunicationsUserHeaderComponent implements OnInit {
  @Input() selectedConversation: IUserCommunication;

  @Output() callFinishChange: EventEmitter<any> = new EventEmitter<any>();

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

    this.dialogPopupService.processPopup(RtcVideoPopupComponent, popupData)
      .subscribe((data: IDialogCloseData) => {
        if (!data) {
          return;
        }

        this.callFinishChange.emit(data.data);
      });
  }
}
