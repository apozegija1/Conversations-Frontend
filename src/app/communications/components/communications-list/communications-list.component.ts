import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './communications-list.component.html',
    // selector: 'app-users-list',
    styleUrls: ['./communications-list.component.scss']
})

export class CommunicationsListComponent implements OnInit {

  conversations: any;
  selectedConversation: any;
  text: string;
  events: Array<any> = [];
  constructor() {

  }

  ngOnInit() {

  }

  selectConversation(conversationId: string) {
  }

  sendText(text: string) {
  }

  send() {

  }
}
