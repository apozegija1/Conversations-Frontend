import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {IUser} from '../../../users/models/iuser.interface';
import {WebrtcService} from '../../../shared/services/webrtc.service';

@Component({
  selector: 'app-video-popup',
  templateUrl: './video-popup.component.html',
  styleUrls: ['./video-popup.component.css']
})
export class VideoPopupComponent implements OnInit {
  private closeOnHangup: (ok: boolean) => void;

  constructor(private webrtcService: WebrtcService,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.listenCallEstablished();
    this.startVideoCall();
    this.listenCallHangup();
  }

  startVideoCall(): void {
    const user: IUser = this.data.customData;
    this.webrtcService.startVideoCall(user);
  }

  listenCallEstablished() {
    this.webrtcService.getListenToCallEstablished()
      .subscribe((event) => {
        const localVideo = document.getElementById('localVideo') as HTMLMediaElement;
        localVideo.srcObject = event.localStream;
        const remoteVideo = document.getElementById('remoteVideo') as HTMLMediaElement;
        remoteVideo.srcObject = event.remoteStream;
      });
  }

  listenCallHangup() {
    this.webrtcService.getListenToCallHangup().subscribe((data) => {
      this.closeOnHangup(true);
    });
  }

  onHangup() {
    this.webrtcService.hangup();
  }

  confirmationPopupInit(data: any) {
    this.closeOnHangup = data.close;
  }
}
