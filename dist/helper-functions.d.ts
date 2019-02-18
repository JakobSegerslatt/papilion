export declare function clearNulls(obj: any): object;
export declare function clone<T = any>(obj: T | T[]): T;
export declare function createGuid(): string;
export declare function contains(x: string, y: string): boolean;
export declare function convertToTypedClass<T = object>(type: any, unTypedItem: any): T;
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
export declare function groupArrayByProperty<T = any>(array: T[], propertyName: string): T[][];
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
export declare function isNotNullorEmpty(v: any): boolean;
export declare function isObject(obj: any): boolean;
/**
 * Converts a string to pascalCase
 * @param value The string to convert
 * @returns The string as pascal or an empty string if null
 */
export declare function pascalCase(value: string): string;
export declare function removeDuplicates<T = any>(val: T[]): T[];
export declare function reverseEnum(obj: any, value: any): any;
/**
 * Custom property decorator which helps store a property in session storage
 *
 * e.g. @Storage() token: string;
 */
export declare function Storage(name?: string): (target: any, key: string) => void;
export declare function throwIfAlreadyLoaded(parentModule: any, moduleName: string): void;
export declare function trimString(s: string, count?: number): string;
