import {BaseUtils} from '../utils/base.utils';
import {ApiService} from '../../core/services/api.service';
import {IPageable} from '../models/interfaces/ipageable.interface';

export abstract  class BaseApiService<T> {
  constructor(protected apiService: ApiService,
              protected baseUri: string) {

  }

  getAll() {
    // Depending if the get all route is one that can be paginated or not this will return data as array or pageable content
    return this.apiService.get<T[]>(`${this.baseUri}/all`);
  }

  get() {
    // Depending if the get all route is one that can be paginated or not this will return data as array or pageable content
    return this.apiService.get<T[]|IPageable<T[]>>(this.baseUri);
  }

  getById(id: number) {
    return this.apiService.getByParam<T>(this.baseUri, id.toString());
  }

  create(data: T) {
    return this.apiService.post(this.baseUri, data);
  }

  update(data: T, id: string|number) {
    return this.apiService.put(BaseUtils.getByIdUri(this.baseUri, id), data);
  }

  delete() {
    return this.apiService.delete(this.baseUri);
  }

  deleteById(id: number) {
    return this.apiService.delete(BaseUtils.getByIdUri(this.baseUri, id.toString()));
  }
}
