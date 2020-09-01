import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    templateUrl: 'communications-send-message.component.html',
    selector: 'app-communications-send-message',
    styleUrls: ['./communications-send-message.component.scss']
})

export class CommunicationsSendMessageComponent implements OnInit {
  messageText: string;

  @Output() messageSend: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {

  }

  send() {
    this.messageSend.emit(this.messageText);
    this.messageText = null;
  }
}
