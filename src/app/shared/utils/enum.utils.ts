import {IBaseMap} from '../models/interfaces/ibase-map.interface';
import {MenuItemType} from '../models/enums/menu-item-type.enum';

export class EnumUtils {
  public static getMenuItemTypeConstants(): IBaseMap<MenuItemType> {
    return {
      Dropdown: MenuItemType.Dropdown,
      Item: MenuItemType.Item,
      ClickItem: MenuItemType.ClickItem
    };
  }
}
