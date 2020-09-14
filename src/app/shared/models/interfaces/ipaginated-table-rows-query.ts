import {Observable} from 'rxjs';

export interface IPaginatedTableRowsQuery {
  query: (q: any) => Observable<any>;
}
