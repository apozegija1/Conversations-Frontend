import {INavbarMenuItem} from './inavbar-menu-item.interface';

export interface INavbarMenu {
  roles: any[];
  items: INavbarMenuItem[];
  shouldRender: (user?) => boolean;
}
