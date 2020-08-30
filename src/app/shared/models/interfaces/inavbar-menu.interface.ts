import {INavbarMenuItem} from './inavbar-menu-item.interface';
import {INavbarShouldRender} from '../types/inavbar-should-render.type';

export interface INavbarMenu {
  roles: any[];
  items: INavbarMenuItem[];
  shouldRender: INavbarShouldRender;
}
