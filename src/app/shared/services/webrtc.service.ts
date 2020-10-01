import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {LocalStorageService} from './local-storage.service';
import {IUser} from '../../users/models/iuser.interface';
import {AuthenticationService} from '../../auth/services/authentication.service';
import {CommunicationsApiService} from '../../communications/services/communications-api.service';
import {Constants} from '../models/constants';
import {IWebrtcToken} from '../models/interfaces/iwebrtc-token.interface';
import {CallOptions, IncomingCall, InfobipRTC, OutgoingCall} from 'infobip-rtc';
import * as moment from 'moment';
import {RtcConnectionStatus} from '../models/enums/rtc-connection-status.enum';
import {RtcIncomingCallStatus} from '../models/enums/rtc-incoming-call-status.enum';
import {IInfobipHangupStatus} from '../models/interfaces/iinfobip-hangup-status.interface';
import {InfobipErrorCodes} from '../models/enums/infobip-error-codes.enum';
import {TranslateService} from '@ngx-translate/core';
import {InfobipHangupStatus} from '../models/enums/infobip-hangup-status.enum';
import {IHangupStatus} from '../models/interfaces/ihangup-status.interface';
import {CommunicationType} from '../../communications/models/communication-type.enum';
import {IRtcCallReport} from '../models/interfaces/irtc-call-report.interface';
import {LoadingService} from '../../core/services/loading.service';
import {BaseSubscription} from '../classes/base-subscription';

@Injectable({
  providedIn: 'root'
})
export class WebrtcService extends BaseSubscription {
  private callReceived = new Subject<any>();
  private callEstablished = new Subject<any>();
  private callHangup = new Subject<IHangupStatus>();

  private outgoingCall: OutgoingCall;
  private incomingCall: IncomingCall;
  private infobipWebRtc: InfobipRTC;

  private connectionStatus: RtcConnectionStatus = RtcConnectionStatus.Default;
  private incomingCallStatus: RtcIncomingCallStatus = RtcIncomingCallStatus.Default;
  private callType: CommunicationType = CommunicationType.Video;

  constructor(private localStorageService: LocalStorageService,
              private authenticationService: AuthenticationService,
              private communicationApiService: CommunicationsApiService,
              private translate: TranslateService,
              private loadingService: LoadingService) {
    super();
  }

  init(): void {
    // We already have token
    const token = this.getToken();
    if (token != null) {
      const hasTokenExpired = moment().isAfter(token.expirationTime);
      // If token expired remove it and proceed with logic for getting new one
      if (hasTokenExpired) {
        this.removeToken();
      } else {
        this.initRtcClient(token.token);
      }
    }

    // When user is logged in get token, no need to sink as while app is running it will listen to login logut events
    this.authenticationService.getIsUserLoggedIn()
      .subscribe((loggedIn: boolean) => {
        this.loggedInInit(loggedIn);
      });
  }

  loggedInInit(loggedIn: boolean) {
    if (loggedIn) {
      this.obtainToken();
    } else {
      this.removeToken();
    }
  }

  initRtcClient(token: string) {
    const options = { debug: true };
    this.infobipWebRtc = new InfobipRTC(token, options);
    this.connectToService();
    this.setupIncomingCall();
  }

  obtainToken(): void {
    const user: IUser = this.authenticationService.getCurrentUser();
    // As token can be obtained multiple times if user logs out and logs in, need to remove this subscription
    this.sink = this.communicationApiService.obtainWebRtcToken(user)
      .subscribe((data: IWebrtcToken) => {
        this.localStorageService.setItem(Constants.LocalStorageKey.CurrentWebrtc, data);
        this.initRtcClient(data.token);
      });
  }

  getToken(): IWebrtcToken {
    return this.localStorageService.getItem<IWebrtcToken>(Constants.LocalStorageKey.CurrentWebrtc);
  }

  removeToken(): void {
    this.localStorageService.removeItem(Constants.LocalStorageKey.CurrentWebrtc);
    this.onLogout();
  }

  startVideoCall(toUser: IUser): void {
    if (!this.infobipWebRtc) {
      return;
    }

    this.connectToService(() => {
      this.callType = CommunicationType.Video;
      this.callUser(toUser);
    });
  }

  hangup() {
    if (this.outgoingCall) {
      this.outgoingCall.hangup();
    }

    if (this.incomingCall) {
      this.incomingCall.hangup();
    }
  }

  setupIncomingCall(): void {
    this.infobipWebRtc.on(Constants.EventName.IncomingCall, (incomingCallEvent) => {
      this.incomingCall = incomingCallEvent.incomingCall;
      this.notifyCallIncoming(this.incomingCall);
      this.incomingCall.on(Constants.EventName.Established, (event) => {
        this.incomingCallStatus = RtcIncomingCallStatus.Accepted;
        this.notifyCallEstablished(event);
      });

      this.incomingCall.on(Constants.EventName.Hangup, (event) => {
        this.incomingCallStatus = RtcIncomingCallStatus.Declined;
        this.handleHangoutStatus(event);
        this.incomingCall = null;
      });
    });
  }

  onLogout() {
    // Remove subscriptions related to current user for rtc logic
    this.disconnect();
    this.unsubscribe();
  }

  private connectToService(connectSuccess: () => void = null) {
    if (this.connectionStatus === RtcConnectionStatus.Connected) {
      if (connectSuccess) {
        connectSuccess();
      }
      return;
    }

    // Check if user is already connected
    this.infobipWebRtc.on(Constants.EventName.Connected, (event) => {
      this.connectionStatus = RtcConnectionStatus.Connected;
      if (connectSuccess) {
        connectSuccess();
      }
    });

    this.infobipWebRtc.on(Constants.EventName.Disconnected, () => {
      this.connectionStatus = RtcConnectionStatus.Disconnected;
    });

    this.infobipWebRtc.connect();
  }

  private callUser(toUser: IUser) {
    try {
      this.outgoingCall = this.infobipWebRtc.call(toUser.username, CallOptions.builder().setVideo(true).build());
    } catch (err) {
      // Try once to reconnect if not able hangup call
      if (this.connectionStatus !== RtcConnectionStatus.Retrying) {
        this.connectionStatus = RtcConnectionStatus.Retrying;
        this.startVideoCall(toUser);
      } else {
        this.connectionStatus = RtcConnectionStatus.Default;
        this.hangup();
      }
      this.outgoingCall = null;
      return;
    }

    this.loadingService.startLoading();
    this.outgoingCall.on(Constants.EventName.Ringing, () => {
      //
    });

    this.outgoingCall.on(Constants.EventName.Established, (event) => {
      this.notifyCallEstablished(event);
      this.loadingService.stopLoading();
    });

    this.outgoingCall.on(Constants.EventName.Hangup, (event) => {
      this.handleHangoutStatus(event);
      this.outgoingCall = null;
      this.loadingService.stopLoading();
    });

    this.outgoingCall.on(Constants.EventName.Error, (event) => {
      this.loadingService.stopLoading();
    });
  }

  getListenToIncomingCall() {
    return this.callReceived.asObservable();
  }

  getListenToCallEstablished() {
    return this.callEstablished.asObservable();
  }

  getListenToCallHangup() {
    return this.callHangup.asObservable();
  }

  notifyCallHangup(status?: IHangupStatus) {
    this.callHangup.next(status);
  }

  notifyCallIncoming(event: any) {
    this.callReceived.next(event);
  }

  notifyCallEstablished(event: any) {
    this.callEstablished.next(event);
  }

  private handleHangoutStatus(event: any) {
    const status = this.getHangoutStatus(event.status);
    this.notifyCallHangup(status);
  }

  private getHangoutStatus(status: IInfobipHangupStatus): IHangupStatus {
    let hangupStatus;
    let statusMessageTranslationKey = `infobip_rtc_error_${status.id}`;
    switch (status.id) {
      case InfobipErrorCodes.NO_ERROR: {
        hangupStatus = InfobipHangupStatus.Success;
        break;
      }
      case InfobipErrorCodes.EC_VOICE_NO_ANSWER:
      case InfobipErrorCodes.EC_VOICE_USER_BUSY:
      case InfobipErrorCodes.EC_VOICE_ERROR_REQUEST_TIMEOUT:
      case InfobipErrorCodes.EC_CONNECTION_ERROR: {
        hangupStatus = InfobipHangupStatus.Error;
        break;
      }
      default: {
        hangupStatus = InfobipHangupStatus.Error;
        statusMessageTranslationKey = 'infobip_rtc_error_unknown';
        break;
      }
    }

    const statusMessage = this.translate.instant(`infobip_rtc_error_${status.id}`);
    const rtcReport = this.getOutgoingCallInfo();
    return {
      message: statusMessage,
      status: hangupStatus,
      type: this.callType,
      data: rtcReport
    };
  }

  private getOutgoingCallInfo(): IRtcCallReport {
    if (!this.outgoingCall) {
      return;
    }


    const duration = this.outgoingCall.duration();
    const startTime = this.outgoingCall.startTime();
    const establishTime = this.outgoingCall.establishTime();
    const endTime = this.outgoingCall.endTime();
    return {
      duration,
      startTime,
      establishTime,
      endTime
    };
  }

  private disconnect() {
    if (this.infobipWebRtc) {
      this.infobipWebRtc.disconnect();
      this.outgoingCall = null;
      this.incomingCall = null;
    }
  }
}
