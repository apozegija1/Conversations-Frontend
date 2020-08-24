
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
  shouldRender?: (user?) => boolean;
}
