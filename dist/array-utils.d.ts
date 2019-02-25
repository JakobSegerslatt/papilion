/**
 * Recursively flattens an array by a specific propertyName or property accessor.
 * It does not mutate the items, meaning the items keeps their original child array.
 * @param array Array to flatten
 * @param key Selector for the child property
 * @returns An flatten array
 */
export declare function flattenTree<T = object>(array: T[] | undefined, key: string | ((s: T) => string)): T[];
/**
 * @returns A random entry from an array
 *
 * Based on Math.random()
 * @param array The array of which you want a random entry
 */
export declare function getRandomEntry<T>(array: T[], arrayToPopulate?: T[], tryCount?: number): T;
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
 * Creates and returns a new array, clearing
 * duplicates with new Set().
 * @param val The array to remove duplicates from
 *
 * @returns An edited copy of @param val
 */
export declare function removeDuplicates<T = any>(val: T[]): T[];
