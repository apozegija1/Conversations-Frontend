import {Component, OnInit} from '@angular/core';
import {BaseUserInfo} from '../../../shared/classes/base-user-info';
import {AuthenticationService} from '../../../auth/services/authentication.service';
import {DialogPopupService} from '../../../shared/services/dialog-popup.service';
import {TranslateService} from '@ngx-translate/core';
import {VideoPopupComponent} from '../video-popup/video-popup.component';
import {CommunicationsApiService} from '../../services/communications-api.service';
import {IUserCommunication} from '../../models/iuser-communication.interface';
import {CommunicationType} from '../../models/communication-type.enum';

@Component({
    templateUrl: './communications-list.component.html',
    styleUrls: ['./communications-list.component.scss']
})

export class CommunicationsListComponent extends BaseUserInfo implements OnInit {
  conversations: IUserCommunication[] = [];
  selectedConversation: IUserCommunication;

  constructor(authService: AuthenticationService,
              private dialogPopupService: DialogPopupService,
              private translate: TranslateService,
              private communicationApiService: CommunicationsApiService) {
    super(authService);
  }

  ngOnInit() {
    this.communicationApiService.getAllUserCommunications()
      .subscribe((data: IUserCommunication[]) => {
        this.conversations = data;
    });
  }

  selectConversation(selectedCommunication: IUserCommunication) {
    this.selectedConversation = selectedCommunication;
  }

  send(text: string) {
    this.communicationApiService.create({
      customerId: this.selectedConversation.user.id,
      startTime: new Date().toDateString(),
      type: CommunicationType.Sms,
      text,
      agentId: this.currentUser.id
    });
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
