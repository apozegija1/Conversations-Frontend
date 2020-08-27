import {ITableConfig} from '../models/interfaces/itable-config.interface';

export class TableConfigService {
  public getDefaultConfig(): ITableConfig {
    return {
      columns: []
    };
  }
}
