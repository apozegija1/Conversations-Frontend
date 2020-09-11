import {Component, Input, OnInit} from '@angular/core';
import {VideoPopupComponent} from '../video-popup/video-popup.component';
import {DialogPopupService} from '../../../shared/services/dialog-popup.service';
import {TranslateService} from '@ngx-translate/core';
import {IUserCommunication} from '../../models/iuser-communication.interface';

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
    this.dialogPopupService.processPopup(VideoPopupComponent,
      this.translate.instant('in_video_call'), '', 'finish_call')
      .subscribe((ok: boolean) => {
        if (!ok) {
          return;
        }
      });
  }
}
