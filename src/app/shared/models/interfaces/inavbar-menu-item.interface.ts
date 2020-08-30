import {INavbarShouldRender} from '../types/inavbar-should-render.type';

export interface INavbarMenuItem {
  title: string;
  icon?: string;
  state: string;
  path?: string;
  type?: string;
  class?: string;
  params?: any;
  roles?: string[];
  position?: number;
  items?: INavbarMenuItem[];
  shouldRender?: INavbarShouldRender;
  isRightSideDivider?: boolean;
  method?: () => void;
}
