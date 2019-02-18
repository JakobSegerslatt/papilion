"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function contains(x, y) {
    x = x || '';
    y = y || '';
    return x.toLowerCase().includes(y.toLowerCase());
}
exports.contains = contains;
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
function groupArrayByProperty(array, propertyName) {
    const sorted = [];
    // Get an array with the relation names and remove dublicates
    let uniqueValues = array.map((item) => {
        let value = item[propertyName];
        if (typeof value === 'string') {
            value = value.toLocaleLowerCase();
        }
        return value;
    }).filter((val) => !!val && val.length > 0);
    uniqueValues = removeDuplicates(uniqueValues);
    // For each property, push in it's related items
    uniqueValues.forEach((propertyValue) => {
        sorted.push(array.filter((item) => item[propertyName] === propertyValue));
    });
    return sorted;
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
// A value can be 0, false, but not an empty string, null or undefined
function isNotNullorEmpty(v) {
    return v !== undefined && v !== '' && v !== null;
}
exports.isNotNullorEmpty = isNotNullorEmpty;
function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}
exports.isObject = isObject;
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
function removeDuplicates(val) {
    return Array.from(new Set(val));
}
exports.removeDuplicates = removeDuplicates;
function reverseEnum(obj, value) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] === value) {
                return key;
            }
        }
    }
}
exports.reverseEnum = reverseEnum;
/**
 * Custom property decorator which helps store a property in session storage
 *
 * e.g. @Storage() token: string;
 */
function Storage(name) {
    return ((target, key) => {
        const storageKey = name || key;
        Object.defineProperty(target, key, {
            configurable: false,
            get: () => sessionStorage.getItem(storageKey),
            set: (val) => sessionStorage.setItem(storageKey, val)
        });
    });
}
exports.Storage = Storage;
function throwIfAlreadyLoaded(parentModule, moduleName) {
    if (parentModule) {
        throw new Error(`${moduleName} has already been loaded.
        Import Core modules in the AppModule only.`);
    }
}
exports.throwIfAlreadyLoaded = throwIfAlreadyLoaded;
function trimString(s, count = 1) {
    return s.substr(0, s.length - count);
}
exports.trimString = trimString;
