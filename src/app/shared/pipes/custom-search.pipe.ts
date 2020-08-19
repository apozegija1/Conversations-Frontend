import { Pipe, PipeTransform } from '@angular/core';
import {CategoryModel} from '../models/category.model';
@Pipe({
  name: 'filter'
})
export class CustomSearchPipe implements PipeTransform {
  transform(values: any[], searchValue: string, searchType: string): any {
    if (!searchValue) { return values; }
    if (!searchType) {
      return values;
    }

    if (searchType === 'Category') {
      const categoryValues: CategoryModel[] = values as (CategoryModel[]);
      return categoryValues.filter((v: CategoryModel) =>
        v.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
        v.description.toLowerCase().indexOf(searchValue.toLowerCase()) > -1);
    }

    return values.filter((v) =>
      v.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1);
  }
}
