
/**
 * Base map interface that can be extended with return data and have string key for map
 */
export interface IBaseMap<T> {
  [key: string]: T;
}
