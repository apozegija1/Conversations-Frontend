import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {IResponse} from '../../shared/models/interfaces/iresponse.interface';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUri;
  }
  private readonly baseUrl: string;

  static getResponseData<T>(data: IResponse<T>) {
    if (data.status === 'SUCCESS') {
      return data.data;
    } else {
      console.log('Could not get data!');
    }
  }

  public getByParam = <T>(url: string, id: string) => this.http.get<T>(`${this.getUrl(url)}/${id}`);

  public get = <T>(url: string) => this.http
    .get<IResponse<T>>(this.getUrl(url))
    .pipe(map(ApiService.getResponseData))

  // https://stackoverflow.com/questions/45698594/property-data-does-not-exist-on-type-httpeventcustomer
  public post = <T>(url: string, body: any, options: object = {}) => this.http.post<T>(this.getUrl(url), body, options);

  public put = <T>(url: string, body: any, options: object = {}) => this.http.put<T>(this.getUrl(url), body, options);

  public delete = <T>(url: string) => this.http.delete<T>(this.getUrl(url));

  private getUrl(url: string): string
  {
    return `${this.baseUrl}/${url}`;
  }
}
