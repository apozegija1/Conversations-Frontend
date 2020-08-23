import {IRole} from './irole.interface';

export class IUser {
    id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    roles: Array<IRole>;
}
