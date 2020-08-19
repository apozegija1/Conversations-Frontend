import {HttpClient} from '@angular/common/http';
import {BaseHelper} from '../helpers/base.helper';
import {ApiService} from '../../core/services/api.service';

export abstract  class BaseApiService<T> {
  constructor(protected apiService: ApiService,
              protected baseUri: string) {

  }

  get() {
    return this.apiService.get<T[]>(this.baseUri);
  }

  getById(id: number) {
    return this.apiService.getByParam<T>(this.baseUri, id.toString());
  }

  create(data: T) {
    return this.apiService.post(this.baseUri, data);
  }

  update(data: T, id: string) {
    return this.apiService.put(BaseHelper.getByIdUri(this.baseUri, id), data);
  }

  delete() {
    return this.apiService.delete(this.baseUri);
  }

  deleteById(id: number) {
    return this.apiService.delete(BaseHelper.getByIdUri(this.baseUri, id.toString()));
  }
}
