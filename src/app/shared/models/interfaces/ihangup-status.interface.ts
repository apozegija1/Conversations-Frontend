import {InfobipHangupStatus} from '../enums/infobip-hangup-status.enum';
import {CommunicationType} from '../../../communications/models/communication-type.enum';
import {IRtcCallReport} from './irtc-call-report.interface';

export interface IHangupStatus {
  status: InfobipHangupStatus;
  message: string;
  type: CommunicationType;
  data: IRtcCallReport;
}
