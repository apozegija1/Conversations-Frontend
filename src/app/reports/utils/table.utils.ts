import {CellType} from '../../shared/models/enums/cell-type.enum';
import {ITableConfig} from '../../shared/models/interfaces/itable-config.interface';

export class TableUtils {
  public static getTableConfig(valueTitle: string): ITableConfig {
    return {
      columns: [{
        dataType: CellType.Text,
        id: 'agent',
        title: 'agent_label',
        showOnSm: true
      },
      {
        dataType: CellType.Text,
        id: 'value',
        title: valueTitle,
        showOnSm: true
      }
      ]
    };
  }
}
