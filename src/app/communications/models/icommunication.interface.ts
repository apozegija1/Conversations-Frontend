import {ICommunicationType} from './icommunication-type.interface';
import {IUser} from '../../users/models/iuser.interface';

export class ICommunication {
    id?: number;
    type: ICommunicationType;
    agent: IUser;
    customer: IUser;
    startTime?: string;
    endTime?: string;
    text: string;
}
