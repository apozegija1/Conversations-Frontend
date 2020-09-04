
export class ArrayUtils {
  // This method accepts array of elements, item to be inserted and position to be inserted at
  // Returns new array with item added to specified insertAt position, it doesn't change original array
  // Immutable way of inserting data at index, it isn't fastest but it is much safer and better for change detection
  public static insertAtIndex<T>(elements: T[], newItem: T, insertAt: number): T[] {
    const data =
      [
        ...elements.slice(0, insertAt),
        newItem,
        ...elements.slice(insertAt)
      ];
    return data;
  }

  // This method accepts array of elements and item to be inserted at the end
  // Returns new array with item added to to the end of the array, it doesn't change original array
  // Immutable way of inserting data at index, it isn't fastest but it is much safer and better for change detection
  public static insert<T>(elements: T[], newItem: T): T[] {
    const data =
      [
        ...elements,
        newItem
      ];
    return data;
  }

  // This method accepts array of elements, item to be updated and position to be updated at
  // Returns new array with item updated at specified index position, it doesn't change original array
  // Immutable way of updating data at index, it isn't fastest but it is much safer and better for change detection
  public static updateAtIndex<T>(elements: T[], newItem: T, index: number): T[] {
    return Object.assign([...elements], { [index]: newItem});
  }

  // This method accepts array of elements and position to be removed from
  // Returns new array with item removed from removeAt position, it doesn't change original array
  // Immutable way of removing data at index
  public static removeAtIndex<T>(elements: T[], removeAt: number): T[] {
    const data =
      [
        ...elements.slice(0, removeAt),
        ...elements.slice(removeAt + 1)
      ];
    return data;
  }

  // Immutable method that returns sub array from 0 till index user specified
  public static sliceToIndex<T>(elements: T[], index: number): T[] {
    const data = elements.slice(0, index);
    return data;
  }

  // This method calculates total sum of values in array
  public static getTotalSum(values: number[]): number {
    return values.reduce((total, curr) => total + curr);
  }

  // Check if passed collection is empty
  public static IsTotalSumZero(values: number[]): boolean {
    return  ArrayUtils.getTotalSum(values) === 0;
  }

  /**
   *
   * @param array Array of the elements to be checked for duplicates
   *
   * This method will check is size of unique elements is same as size of the array
   */
  public static hasDuplicates(array: any[]): boolean {
    return (new Set(array)).size !== array.length;
  }

  /**
   * Compares arrays based on same scalar elements and returns true if scalar elements are same
   * @param array1 First array to compare
   * @param array2 Second array to compare
   */
  public static isEqual(array1: any[], array2: any[]): boolean {
    return array1.length === array2.length && array1
      .every((value, index) => value === array2[index]);
  }
}
