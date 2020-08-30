import {IRole} from './irole.interface';
import {ICompany} from '../../companies/models/icompany.interface';

export class IUser {
    id?: number;
    username: string;
    password?: string;
    firstname: string;
    lastname: string;
    email: string;
    phone?: string;
    gender?: string;
    company?: ICompany;
    roles: Array<IRole>;
}
