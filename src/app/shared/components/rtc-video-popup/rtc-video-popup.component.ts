import {Component, Inject, Injectable, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {IUser} from '../../../users/models/iuser.interface';
import {WebrtcService} from '../../services/webrtc.service';
import {Subject} from 'rxjs';
import {BaseSubscription} from '../../classes/base-subscription';
import {IHangupStatus} from '../../models/interfaces/ihangup-status.interface';
import {AlertService} from '../../services/alert.service';
import {InfobipHangupStatus} from '../../models/enums/infobip-hangup-status.enum';
import {HangupCloseFn} from '../../models/types/hangup-close-fn.type';

@Component({
  selector: 'app-video-popup',
  templateUrl: './rtc-video-popup.component.html',
  styleUrls: ['./rtc-video-popup.component.scss']
})
@Injectable()
export class RtcVideoPopupComponent extends BaseSubscription implements OnInit, OnDestroy {
  private closeOnHangup: HangupCloseFn;
  public isCallEstablished$: Subject<boolean> = new Subject<boolean>();

  constructor(private webrtcService: WebrtcService,
              private alertService: AlertService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
  }

  ngOnInit() {
    this.listenCallEstablished();
    // If there is customData then user is starting call, if not is is receiving one
    if (this.data.customData) {
      this.startVideoCall();
    }
    this.listenCallHangup();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  startVideoCall(): void {
    const user: IUser = this.data.customData;
    this.webrtcService.startVideoCall(user);
  }

  listenCallEstablished() {
    this.sink = this.webrtcService.getListenToCallEstablished()
      .subscribe((event) => {
        this.isCallEstablished$.next(true);
        const localVideo = document.getElementById('localVideo') as HTMLMediaElement;
        localVideo.srcObject = event.localStream;
        const remoteVideo = document.getElementById('remoteVideo') as HTMLMediaElement;
        remoteVideo.srcObject = event.remoteStream;
      });
  }

  listenCallHangup() {
    this.sink = this.webrtcService.getListenToCallHangup()
      .subscribe((hangupStatus: IHangupStatus) => {
        if (hangupStatus.status === InfobipHangupStatus.Error) {
          this.alertService.error(hangupStatus.message);
          // If there was error then we set end time to null to indicate call was not established
          hangupStatus.data.endTime = null;
        } else if (hangupStatus.status === InfobipHangupStatus.Success) {
          this.alertService.success(hangupStatus.message);
        }

        this.closeOnHangup(true, hangupStatus);
        this.isCallEstablished$.next(false);
    });
  }

  onHangup() {
    this.webrtcService.hangup();
  }

  confirmationPopupInit(data: any) {
    this.closeOnHangup = data.close;
  }
}
