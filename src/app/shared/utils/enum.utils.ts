import {IBaseMap} from '../models/interfaces/ibase-map.interface';
import {MenuItemType} from '../models/enums/menu-item-type.enum';
import {CommunicationType} from '../../communications/models/communication-type.enum';

export class EnumUtils {
  public static getMenuItemTypeConstants(): IBaseMap<MenuItemType> {
    return {
      Dropdown: MenuItemType.Dropdown,
      Item: MenuItemType.Item,
      ClickItem: MenuItemType.ClickItem
    };
  }

  public static getCommunicationTypeConstants(): IBaseMap<CommunicationType> {
    return {
      Sms: CommunicationType.Sms,
      Video: CommunicationType.Video,
      Audio: CommunicationType.Audio
    };
  }
}
