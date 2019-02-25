"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @returns a random guid.
 * Uses bitwise calculations.
 */
function createGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        // tslint:disable-next-line:no-bitwise
        const r = (Math.random() * 16) | 0;
        // tslint:disable-next-line:no-bitwise
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
exports.createGuid = createGuid;
/**
 * Checks if the string @param x contains the string @param y
 * without being case sensitive.
 */
function contains(x, y) {
    x = x || '';
    y = y || '';
    return x.toLocaleLowerCase().includes(y.toLocaleLowerCase());
}
exports.contains = contains;
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
function isNotNullorEmpty(val) {
    return val !== undefined && val !== '' && val !== null;
}
exports.isNotNullorEmpty = isNotNullorEmpty;
/**
 * Converts a string to pascalCase
 * @param value The string to convert
 * @returns The string as pascal or an empty string if null
 */
function pascalCase(value) {
    if (value && typeof value === 'string' && value.length > 0) {
        return value[0].toLocaleLowerCase() + value.substr(1);
    }
    return '';
}
exports.pascalCase = pascalCase;
/**
 * Removes the @param count from @param s, starting from the end of the string.
 * Uses the substr() method.
 */
function trimString(s, count = 1) {
    return s.substr(0, s.length - count);
}
exports.trimString = trimString;
//# sourceMappingURL=string-utils.js.map