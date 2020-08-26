import {IUser} from '../../users/models/iuser.interface';
import {ICommunication} from './icommunication.interface';

export class IUserCommunication {
    user: IUser;
    communications: ICommunication[];
}
