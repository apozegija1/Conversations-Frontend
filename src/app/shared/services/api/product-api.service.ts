import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Constants} from '../../models/constants';
import {ProductModel} from '../../models/product.model';
import {BaseUtils} from '../../utils/base.utils';
import {BaseApiService} from '../base-api.service';
import {ApiService} from '../../../core/services/api.service';
import {Observable} from 'rxjs';

@Injectable()
export class ProductApiService extends BaseApiService<ProductModel> {
    constructor(apiService: ApiService) {
      super(apiService, Constants.Api.Products);
    }

    getByCategoryName(category: string): Observable<ProductModel[]> {
      return this.apiService.get<ProductModel[]>(BaseUtils.getByIdUri(this.baseUri + 'for', category));
    }
}
