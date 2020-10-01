import {Component, Input} from '@angular/core';
import {IUserCommunication} from '../../models/iuser-communication.interface';
import {IUser} from '../../../users/models/iuser.interface';
import {EnumUtils} from '../../../shared/utils/enum.utils';

@Component({
  templateUrl: './communications-list.component.html',
  selector: 'app-communications-list',
  styleUrls: ['./communications-list.component.scss']
})

export class CommunicationsListComponent  {
  @Input() selectedConversation: IUserCommunication;

  @Input() currentUser: IUser;

  public communicationTypes = EnumUtils.getCommunicationTypeConstants();
}
