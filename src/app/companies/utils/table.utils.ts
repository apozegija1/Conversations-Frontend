import {CellType} from '../../shared/models/enums/cell-type.enum';
import {ITableConfig} from '../../shared/models/interfaces/itable-config.interface';

export class TableUtils {
  public static getTableConfig(): ITableConfig {
    return {
      columns: [{
        dataType: CellType.Text,
        id: 'id',
        title: 'Id'
      },
        {
          dataType: CellType.Text,
          id: 'name',
          title: 'name_header'
        },
        {
          dataType: CellType.Text,
          id: 'address',
          title: 'address_label'
        },
        {
          dataType: CellType.ActionButtons,
          id: 'actions',
          title: 'actions_label'
        }]
    };
  }
}
