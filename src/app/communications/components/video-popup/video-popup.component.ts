import {Component, Inject, OnInit} from '@angular/core';
import {InfobipRTC, OutgoingCall} from 'infobip-rtc';
import {CommunicationsApiService} from '../../services/communications-api.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-video-popup',
  templateUrl: './video-popup.component.html',
  styleUrls: ['./video-popup.component.css']
})
export class VideoPopupComponent implements OnInit {
  private outgoingCall: OutgoingCall;

  constructor(private communicationApiService: CommunicationsApiService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.obtainToken();
  }

  obtainToken() {
    this.communicationApiService.obtainWebRtcToken(this.data.customData)
      .subscribe((data) => {
        this.startVideoCall(data.token);
      });
  }

  startVideoCall(token: string): void {
    const options = { debug: true };
    const infobipRTC = new InfobipRTC(token, options);

    infobipRTC.on('connected', (event) => {
      console.log('Connected with identity: ' + event.identity);
    });
    infobipRTC.on('disconnected', (event) => {
      console.log('Disconnected!');
    });

    infobipRTC.connect();

    this.outgoingCall = infobipRTC.call('Alice');

    this.outgoingCall.on('ringing', (event) => {
      console.log('Call is ringing on Alice\'s device!');
    });
    this.outgoingCall.on('established', (event) => {
      console.log('Alice answered call!');
    });
    this.outgoingCall.on('hangup', (event) => {
      console.log('Call is done! Status: ' + JSON.stringify(event.status));
    });
    this.outgoingCall.on('error', (event) => {
      console.log('Oops, something went very wrong! Message: ' + JSON.stringify(event));
    });
  }

  onHangup() {
    if (this.outgoingCall) {
      this.outgoingCall.hangup();
    }
  }

}
