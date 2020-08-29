export class BaseUtils {
  public static getByIdUri(baseUri: string, id: string|number): string {
    return baseUri + '/' + id;
  }
}
