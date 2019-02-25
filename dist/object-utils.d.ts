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
 * Checks if @param obj is not null and is an object.
 */
export declare function isObject(obj: any): boolean;
