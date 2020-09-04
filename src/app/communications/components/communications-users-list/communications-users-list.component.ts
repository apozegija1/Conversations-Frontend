import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {IUserCommunication} from '../../models/iuser-communication.interface';

@Component({
    templateUrl: 'communications-users-list.component.html',
    selector: 'app-communications-user-list',
  styleUrls: ['./communications-users-list.component.scss']
})

export class CommunicationsUsersListComponent implements OnInit {
  @Input() conversations: IUserCommunication[] = [];

  @Input() selectedConversation: IUserCommunication;

  @Output() conversationSelected: EventEmitter<any> = new EventEmitter<any>();

  constructor() {

  }

  ngOnInit() {

  }

  selectConversation(selectedCommunication: IUserCommunication) {
    this.conversationSelected.emit(selectedCommunication);
  }
}
