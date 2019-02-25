/**
 * Deletes all properties/entries within an object or an array
 * which are null, undefined or empty object.
 *
 * Note that empty arrays are not cleared!
 *
 * @example
 * clearNulls([
 *  {
 *    foo: 'foo',
 *    bar: false,
 *    baz: null
 *  },
 *  { },
 *  [ ]
 * ]);
 * returns
 * [
 *  {
 *    foo: 'foo',
 *    bar: false,
 *  },
 *  [ ]
 * ]
 *
 * @param obj The object to clean
 */
export declare function clearNulls(obj: any): object;
/**
 * @returns A copy of @param obj
 * It can be an array, object, class or primitive type.
 */
export declare function clone<T = any>(obj: T | T[]): T;
/**
 * Creates a new instance of @param type and copies all values from
 * @param unTypedItem with a simple for in loop.
 * Works non-recursively
 */
export declare function convertToTypedClass<T = object>(type: any, unTypedItem: any): T;
/**
 * Finds the enum key for a specfic value
 * in an object, class or Enum
 * @param obj The object to check, e.g. an Enum
 * @param value A value from within the object
 */
export declare function findKeyForValue(obj: any, value: any): string | number | undefined;
/**
 * Recursively flattens an array by a specific propertyName or property accessor.
 * It does not mutate the items, meaning the items keeps their original child array.
 * @param array Array to flatten
 * @param key Selector for the child property
 * @returns An flatten array
 */
export declare function flattenTree<T = object>(array: T[] | undefined, key: string | ((s: T) => string)): T[];
/**
 * Groups an array of items into multiple arrays,
 * grouped by a common property
 * @param array All properties
 */
export declare function groupArrayByProperty<T = any>(array: T[], key: string | ((s: T) => string | number)): T[][];
/**
 * Groups an array of objects by a key
 * example: groupOptionsBy([
 *  {a: 1, b: 'group1'},
 *  {a: 1, b: 'group2'},
 *  {a: 1, b: 'group2'}
 * ],
 *  'b'
 * )
 * returns:
 * [
 *  label: 'group1',
 *  options: [
 *      {a: 1, b: 'group1'}
 *  ],
 *  'group2',
 *  options: [
 *      {a: 1, b: 'group2'},
 *      {a: 1, b: 'group2'}
 *  ]
 * ]
 * Note: if the key is not defined for an object, the object will not be a part of the result!
 * @param {any[]} array
 * @param {(string | ((string) => string))} key: either a field or
 *                                               a function returning a value to group by
 * @returns {IOptionGroup[]}
 * @memberof AbstractFormInput
 */
/**
 * Checks if @param obj is not null and is an object.
 */
export declare function isObject(obj: any): boolean;
/**
 * Creates and returns a new array, clearing
 * duplicates with new Set().
 * @param val The array to remove duplicates from
 *
 * @returns An edited copy of @param val
 */
export declare function removeDuplicates<T = any>(val: T[]): T[];
