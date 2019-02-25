/**
 * @returns a random guid.
 * Uses bitwise calculations.
 */
export declare function createGuid(): string;
/**
 * Checks if the string @param x contains the string @param y
 * without being case sensitive.
 */
export declare function contains(x: string, y: string): boolean;
/**
 * Checks any value for null, undefined or '',
 * but returns true for false etc.
 *
 * Can be used in querylanguages like Odata to safecheck a
 * valid value for a filter.
 *
 * It IS NOT meant to be used with objects or arrays
 * @param val The value to safec heck
 */
export declare function isNotNullorEmpty(val: any): boolean;
/**
 * Converts a string to pascalCase
 * @param value The string to convert
 * @returns The string as pascal or an empty string if null
 */
export declare function pascalCase(value: string): string;
/**
 * Removes the @param count from @param s, starting from the end of the string.
 * Uses the substr() method.
 */
export declare function trimString(s: string, count?: number): string;
