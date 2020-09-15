import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class CustomSearchPipe implements PipeTransform {
  transform(values: any[], searchValue: string, searchType: string): any {
    if (!searchValue) { return values; }
    if (!searchType) {
      return values;
    }

    return values.filter((v) =>
      v.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1);
  }
}
