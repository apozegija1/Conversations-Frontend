// Response from the server for request
export interface IResponse<T> {
  status: string;
  data: T;
  message: string;
}
