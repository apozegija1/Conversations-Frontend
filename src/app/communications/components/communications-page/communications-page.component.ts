import {Component, OnInit} from '@angular/core';
import {BaseUserInfo} from '../../../shared/classes/base-user-info';
import {AuthenticationService} from '../../../auth/services/authentication.service';
import {CommunicationsApiService} from '../../services/communications-api.service';
import {IUserCommunication} from '../../models/iuser-communication.interface';
import {CommunicationType} from '../../models/communication-type.enum';
import {ICommunication} from '../../models/icommunication.interface';
import {ArrayUtils} from '../../../shared/utils/array.utils';
import {IUser} from '../../../users/models/iuser.interface';
import {BehaviorSubject} from 'rxjs';

@Component({
    templateUrl: './communications-page.component.html',
    selector: 'app-communications',
    styleUrls: ['./communications-page.component.scss']
})

export class CommunicationsPageComponent extends BaseUserInfo implements OnInit {
  conversations$: BehaviorSubject<IUserCommunication[]> = new BehaviorSubject<IUserCommunication[]>([]);

  conversations: IUserCommunication[];
  selectedConversation: IUserCommunication;

  public isReadOnly = false;

  constructor(authService: AuthenticationService,
              private communicationApiService: CommunicationsApiService) {
    super(authService);
  }

  ngOnInit() {
    // If user is not agent or regular user then it is company admin and can only see communication, can't replay
    this.isReadOnly = !this.authService.isAgent() && !this.authService.isUser();
    this.communicationApiService.getAllUserCommunications()
      .subscribe((data: IUserCommunication[]) => {
        this.conversations = data;
        this.conversations$.next(data);
    });
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

  send(text: string) {
    const {customer, agent } = this.getAgentAndCustomer(this.selectedConversation.user);

    const newConversation: ICommunication = {
      customer,
      startTime: new Date().toJSON(),
      type: { type: CommunicationType.Sms, id: null },
      text,
      agent
    };

    this.subsink.sink = this.communicationApiService.create(newConversation)
      .subscribe((data) => {
        this.selectedConversation.communications = ArrayUtils
          .insert(this.selectedConversation.communications, newConversation);
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
}