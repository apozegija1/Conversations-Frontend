export class BaseHelper {
  public static getByIdUri(baseUri: string, id: string): string {
    return baseUri + '/' + id;
  }
}
