import {CellType} from '../enums/cell-type.enum';

export interface ITableColumn {
  dataType: CellType;
  id: string;
  sortOn?: string;
  iconName?: string;
  headerIcon?: string;
  title?: string;
  showOnSm?: boolean;
}
