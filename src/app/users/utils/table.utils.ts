import {ITableConfig} from '../../shared/models/interfaces/itable-config.interface';
import {CellType} from '../../shared/models/enums/cell-type.enum';

export class TableUtils {
  public static getTableConfig(): ITableConfig {
    return {
      columns: [{
        dataType: CellType.Text,
        id: 'id',
        title: 'Id',
        showOnSm: true
      },
      {
        dataType: CellType.Text,
        id: 'username',
        title: 'username_label',
        showOnSm: true
      },
      {
        dataType: CellType.Text,
        id: 'firstname',
        title: 'first_name_label'
      },
      {
        dataType: CellType.Text,
        id: 'lastname',
        title: 'last_name_label'
      },
      {
        dataType: CellType.Text,
        id: 'email',
        title: 'email_label'
      },
      {
        dataType: CellType.Text,
        id: 'phone',
        title: 'phone_label'
      },
      {
        dataType: CellType.ActionButtons,
        id: 'actions',
        title: 'actions_label',
        showOnSm: true
      }]
    };
  }
}
