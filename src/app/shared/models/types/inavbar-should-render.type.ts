import {IUser} from '../../../users/models/iuser.interface';

export type INavbarShouldRender = (user?: IUser, from?: string) => boolean;
