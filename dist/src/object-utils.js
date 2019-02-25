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
 * Recursively flattens an array by a specific propertyName or property accessor.
 * It does not mutate the items, meaning the items keeps their original child array.
 * @param array Array to flatten
 * @param key Selector for the child property
 * @returns An flatten array
 */
function flattenTree(array = [], key) {
    const flat = [];
    array.forEach((child) => {
        flat.push(child);
        const childArray = (key instanceof Function ? key(child) : child[key]) || [];
        flat.push(...flattenTree(childArray, key));
    });
    return flat;
}
exports.flattenTree = flattenTree;
/**
 * Groups an array of items into multiple arrays,
 * grouped by a common property
 * @param array All properties
 */
function groupArrayByProperty(array, key) {
    const grouped = [];
    // Get an array with the relation names and remove dublicates
    let uniqueValues = array.map((item) => {
        let value = (key instanceof Function ? key(item) : item[key]);
        if (typeof value === 'string') {
            value = value.toLocaleLowerCase();
        }
        return value;
    }).filter((val) => (!!val && val.length > 0) || typeof val === 'number');
    uniqueValues = removeDuplicates(uniqueValues);
    // For each property, push in it's related items
    uniqueValues.forEach((propertyValue) => {
        grouped.push(array.filter((item) => (key instanceof Function ? key(item) : item[key]) === propertyValue));
    });
    return grouped;
}
exports.groupArrayByProperty = groupArrayByProperty;
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
// export function groupOptionsBy<T = ISelectOption>(
// array: T[], key: string | ((s) => string)): IOptionGroup[] {
//     return array.reduce((accumulatedGroups, item) => {
//         // Get the GroupName on the item
//         const label = (key instanceof Function ? key(item) : item[key]) || '';
//         // Find the group from the previous added group
//         const group = accumulatedGroups.find(r => r && (r.label || '') === label);
//         if (group) {
//             group.options.push(item);
//         } else {
//             // If no group was found, add it
//             accumulatedGroups.push({ label: label, options: [item] });
//         }
//         return accumulatedGroups;
//     }, []);
// }
/**
 * Checks if @param obj is not null and is an object.
 */
function isObject(obj) {
    return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
}
exports.isObject = isObject;
/**
 * Creates and returns a new array, clearing
 * duplicates with new Set().
 * @param val The array to remove duplicates from
 *
 * @returns An edited copy of @param val
 */
function removeDuplicates(val) {
    return Array.from(new Set(val));
}
exports.removeDuplicates = removeDuplicates;
//# sourceMappingURL=object-utils.js.map