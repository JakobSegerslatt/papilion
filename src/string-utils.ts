
/**
 * @returns a random guid.
 * Uses bitwise calculations.
 */
export function createGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        // tslint:disable-next-line:no-bitwise
        const r = (Math.random() * 16) | 0;
        // tslint:disable-next-line:no-bitwise
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

/**
 * Checks if the string @param x contains the string @param y
 * without being case sensitive.
 */
export function contains(x: string, y: string): boolean {
    x = x || '';
    y = y || '';
    return x.toLocaleLowerCase().includes(y.toLocaleLowerCase());
}

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
export function isNotNullorEmpty(val: any): boolean {
    return val !== undefined && val !== '' && val !== null;
}

/**
 * Converts a string to pascalCase
 * @param value The string to convert
 * @returns The string as pascal or an empty string if null
 */
export function pascalCase(value: string): string {
    if (value && typeof value === 'string' && value.length > 0) {
        return value[0].toLocaleLowerCase() + value.substr(1);
    }
    return '';
}

/**
 * Removes the @param count from @param s, starting from the end of the string.
 * Uses the substr() method.
 */
export function trimString(s: string, count = 1): string {
    return s.substr(0, s.length - count);
}
