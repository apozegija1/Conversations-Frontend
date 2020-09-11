import {INavbarShouldRender} from '../types/inavbar-should-render.type';
import {MenuItemType} from '../enums/menu-item-type.enum';

export interface INavbarMenuItem {
  title: string;
  icon?: string;
  state: string;
  path?: string;
  type?: MenuItemType;
  class?: string;
  params?: any;
  roles?: string[];
  position?: number;
  items?: INavbarMenuItem[];
  shouldRender?: INavbarShouldRender;
  isRightSideDivider?: boolean;
  method?: () => void;
}
