import { Component, OnInit } from '@angular/core';
import {BaseUserInfo} from '../../../shared/classes/base-user-info';
import {AuthenticationService} from '../../../auth/services/authentication.service';
import {DialogPopupService} from '../../../shared/services/dialog-popup.service';
import {TranslateService} from '@ngx-translate/core';
import {VideoPopupComponent} from '../video-popup/video-popup.component';
import {CommunicationsApiService} from '../../services/communications-api.service';

@Component({
    templateUrl: './communications-list.component.html',
    styleUrls: ['./communications-list.component.scss']
})

export class CommunicationsListComponent extends BaseUserInfo implements OnInit {
  conversations: any[] = [];
  selectedConversation: any;

  messageText: string;
  events: Array<any> = [];

  constructor(authService: AuthenticationService,
              private dialogPopupService: DialogPopupService,
              private translate: TranslateService,
              private communicationApiService: CommunicationsApiService) {
    super(authService);
  }

  ngOnInit() {
    this.communicationApiService.getAllUserCommunications().subscribe((data) => {
      this.conversations = data;
    });
  }

  selectConversation(conversationId: string) {
    this.selectedConversation = this.conversations
      .find((conversation) => conversation.id === conversationId);
  }

  sendText(text: string) {

  }

  send() {

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
