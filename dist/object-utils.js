"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function clearNulls(obj) {
    if (isObject(obj) || Array.isArray(obj)) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const val = obj[key];
                if (val === null || val === undefined) {
                    delete obj[key];
                }
                else {
                    // Recursively check objects and arrays, but not moments or dates
                    obj[key] = clearNulls(val);
                }
                /**
                 * If the object is empty, we clear it as well
                 * E.g [{}] becomes []
                 */
                if (isObject(val) && Object.keys(val).length === 0) {
                    delete obj[key];
                }
            }
        }
    }
    return obj;
}
exports.clearNulls = clearNulls;
/**
 * @returns A copy of @param obj
 * It can be an array, object, class or primitive type.
 */
function clone(obj) {
    let newObj;
    if (Array.isArray(obj)) {
        newObj = [...obj];
    }
    else if (isObject(obj)) {
        newObj = Object.assign({}, obj);
    }
    else {
        newObj = obj;
    }
    return newObj;
}
exports.clone = clone;
/**
 * Creates a new instance of @param type and copies all values from
 * @param unTypedItem with a simple for in loop.
 * Works non-recursively
 */
function convertToTypedClass(type, unTypedItem) {
    const newItem = new type();
    if (unTypedItem) {
        for (const key in unTypedItem) {
            if (unTypedItem.hasOwnProperty(key)) {
                newItem[key] = unTypedItem[key];
            }
        }
    }
    return newItem;
}
exports.convertToTypedClass = convertToTypedClass;
/**
 * Finds the enum key for a specfic value
 * in an object, class or Enum
 * @param obj The object to check, e.g. an Enum
 * @param value A value from within the object
 */
function findKeyForValue(obj, value) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] === value) {
                return key;
            }
        }
    }
}
exports.findKeyForValue = findKeyForValue;
/**
 * Checks if @param obj is not null and is an object.
 */
function isObject(obj) {
    return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
}
exports.isObject = isObject;
//# sourceMappingURL=object-utils.js.map