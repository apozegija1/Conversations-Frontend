import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseUserInfo} from '../../../shared/classes/base-user-info';
import {AuthenticationService} from '../../../auth/services/authentication.service';
import {CommunicationsApiService} from '../../services/communications-api.service';
import {IUserCommunication} from '../../models/iuser-communication.interface';
import {CommunicationType} from '../../models/communication-type.enum';
import {ICommunication} from '../../models/icommunication.interface';
import {ArrayUtils} from '../../../shared/utils/array.utils';
import {IUser} from '../../../users/models/iuser.interface';
import {BehaviorSubject} from 'rxjs';
import {IHangupStatus} from '../../../shared/models/interfaces/ihangup-status.interface';
import {ISupportedCommunicationTypes} from '../../models/isupported-communication-types.interface';

@Component({
    templateUrl: './communications-page.component.html',
    selector: 'app-communications',
    styleUrls: ['./communications-page.component.scss']
})
export class CommunicationsPageComponent extends BaseUserInfo implements OnInit, OnDestroy {
  conversations$: BehaviorSubject<IUserCommunication[]> = new BehaviorSubject<IUserCommunication[]>([]);

  conversations: IUserCommunication[];
  selectedConversation: IUserCommunication;

  public supportedUserCommunication: ISupportedCommunicationTypes;

  public isReadOnly = false;

  constructor(authService: AuthenticationService,
              private communicationApiService: CommunicationsApiService) {
    super(authService);
  }

  ngOnInit() {
    // If user is not agent or regular user then it is company admin and can only see communication, can't replay
    this.isReadOnly = !this.authService.isAgent() && !this.authService.isUser();
    this.supportedUserCommunication = {
      isVideoCallSupported: !this.isReadOnly,
      isSmsSupported: !this.isReadOnly
    };

    this.sink = this.communicationApiService.getAllUserCommunications()
      .subscribe((data: IUserCommunication[]) => {
        this.conversations = data;
        this.conversations$.next(data);
    });
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  selectedUserForCommunication(user: IUser) {
    const conFound = this.conversations
      .find((con) => con.user.username === user.username);

    if (conFound) {
      return;
    }

    const newConversation: IUserCommunication = {
      user,
      communications: []
    };
    this.conversations = ArrayUtils.insert(this.conversations, newConversation);
    this.conversations$.next(this.conversations);
  }

  selectConversation(selectedCommunication: IUserCommunication) {
    this.selectedConversation = selectedCommunication;
  }

  sendSms(text: string) {
    const newConversation: ICommunication = this.getCommunication(text);
    this.send(newConversation);
  }

  sendVideoCommunication(hangupStatus: IHangupStatus) {
    const data = hangupStatus.data;
    const newConversation: ICommunication = this.getCommunication('Video call', hangupStatus.type, data.startTime, data.endTime);
    this.send(newConversation);
  }

  private send(conversation: ICommunication) {
    this.sink = this.communicationApiService.create(conversation)
      .subscribe(() => {
        this.selectedConversation.communications = ArrayUtils
          .insert(this.selectedConversation.communications, conversation);
      });
  }

  private getAgentAndCustomer(user: IUser) {
    let customer: IUser, agent: IUser;
    if (this.authService.isAgent()) {
      customer = user;
      agent = this.currentUser;
    } else if (this.authService.isUser()) {
      customer = this.currentUser;
      agent = user;
    } else {
      throw Error('Unsupported role for sending');
    }

    return {
      customer,
      agent
    };
  }

  private getCommunication(text: string, type: CommunicationType = CommunicationType.Sms,
                           startTime = new Date(), endTime = null): ICommunication {
    const {customer, agent } = this.getAgentAndCustomer(this.selectedConversation.user);

    if (endTime) {
      endTime = endTime.toJSON();
    }

    return {
      customer,
      startTime: startTime.toJSON(),
      type: {type, id: null},
      text,
      endTime,
      agent
    };
  }
}
