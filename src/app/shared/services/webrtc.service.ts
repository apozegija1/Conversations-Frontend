import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {LocalStorageService} from './local-storage.service';
import {IUser} from '../../users/models/iuser.interface';
import {AuthenticationService} from '../../auth/services/authentication.service';
import {CommunicationsApiService} from '../../communications/services/communications-api.service';
import {Constants} from '../models/constants';
import {IWebrtcToken} from '../models/interfaces/iwebrtc-token.interface';
import {CallOptions, InfobipRTC, OutgoingCall} from 'infobip-rtc';
import * as moment from 'moment';
import {RtcConnectionStatus} from '../models/enums/rtc-connection-status.enum';

@Injectable({
  providedIn: 'root'
})
export class WebrtcService {
  private callReceived = new Subject<any>();
  private callEstablished = new Subject<any>();
  private callHangup = new Subject<any>();

  private outgoingCall: OutgoingCall;
  private infobipWebRtc: InfobipRTC;

  private connectionStatus: RtcConnectionStatus = RtcConnectionStatus.Default;

  constructor(private localStorageService: LocalStorageService,
              private authenticationService: AuthenticationService,
              private communicationApiService: CommunicationsApiService) {
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
        return;
      }
    }

    // When user is logged in get token
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
    this.communicationApiService.obtainWebRtcToken(user)
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
  }

  startVideoCall(toUser: IUser): void {
    if (!this.infobipWebRtc) {
      return;
    }

    this.connectToService(() => {
      this.callUser(toUser);
    });
  }

  hangup() {
    if (this.outgoingCall) {
      this.outgoingCall.hangup();
      this.outgoingCall = null;
      this.notifyCallHangup();
    }
  }

  setupIncomingCall(): void {
    this.infobipWebRtc.on('incoming-call', (incomingCallEvent) => {
      const incomingCall = incomingCallEvent.incomingCall;
      console.log('Received incoming call from: ' + incomingCall.source().identity, incomingCallEvent);
      this.notifyCallReceived(incomingCall);
      // incomingCall.on('established', function() {});
      // incomingCall.on('hangup', function() {});

      incomingCall.accept(); // or incomingCall.decline();
    });
  }

  private connectToService(connectSuccess: () => void = null) {
    if (this.connectionStatus === RtcConnectionStatus.Connected) {
      if (connectSuccess) {
        connectSuccess();
      }
    }

    // Check if user is already connected
    this.infobipWebRtc.on('connected', (event) => {
      console.log('Connected with identity: ' + event.identity);
      this.connectionStatus = RtcConnectionStatus.Connected;
      if (connectSuccess) {
        connectSuccess();
      }
    });

    this.infobipWebRtc.on('disconnected', (event) => {
      console.log('Disconnected!');
      this.connectionStatus = RtcConnectionStatus.Disconnected;
    });

    this.infobipWebRtc.connect();
  }

  private callUser(toUser: IUser) {
    this.outgoingCall = this.infobipWebRtc.call(toUser.username, CallOptions.builder().setVideo(true).build());

    this.outgoingCall.on('ringing', (event) => {
      console.log(`Call is ringing on ${toUser.username}\'s device!`);
    });

    this.outgoingCall.on('established', (event) => {
      console.log('Answered call!');
      this.notifyCallEstablished(event);
    });

    this.outgoingCall.on('hangup', (event) => {
      console.log('Call is done! Status: ' + JSON.stringify(event.status));
      this.notifyCallHangup();
    });

    this.outgoingCall.on('error', (event) => {
      console.log('Oops, something went very wrong! Message: ' + JSON.stringify(event));
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

  notifyCallHangup() {
    this.callHangup.next();
  }

  notifyCallReceived(event: any) {
    this.callReceived.next(event);
  }

  notifyCallEstablished(event: any) {
    this.callEstablished.next(event);
  }
}
