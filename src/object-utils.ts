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
export function clearNulls(obj: any): object {
    if (isObject(obj) || Array.isArray(obj)) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const val = obj[key];
                if (val === null || val === undefined) {
                    delete obj[key];
                } else {
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

export function clone<T = any>(obj: T | T[]): T {
    let newObj: T | T[];
    if (Array.isArray(obj)) {
        newObj = [...obj];
    } else if (isObject(obj)) {
        newObj = { ...obj };
    } else {
        newObj = obj;
    }
    return newObj as T;
}

/**
 * Creates a new instance of @param type and copies all values from
 * @param unTypedItem with a simple for in loop.
 * Works non-recursively
 */
export function convertToTypedClass<T = object>(type: any, unTypedItem: any): T {
    const newItem = new (type as any)();
    if (unTypedItem) {
        for (const key in unTypedItem) {
            if (unTypedItem.hasOwnProperty(key)) {
                newItem[key] = unTypedItem[key];
            }
        }
    }
    return newItem;
}

/**
 * Finds the enum key for a specfic value
 * in an object, class or Enum
 * @param obj The object to check, e.g. an Enum
 * @param value A value from within the object
 */
export function findKeyForValue(obj: any, value: any): any {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] === value) {
                return key;
            }
        }
    }
}

/**
 * Recursively flattens an array by a specific propertyName or property accessor.
 * It does not mutate the items, meaning the items keeps their original child array.
 * @param array Array to flatten
 * @param key Selector for the child property
 * @returns An flatten array
 */
export function flattenTree<T = object>(array: T[] = [], key: string | ((s: T) => string)): T[] {
    const flat: T[] = [];
    array.forEach((child) => {
        flat.push(child);
        const childArray: T[] = (key instanceof Function ? key(child) : (child as any)[key]) || [];
        flat.push(...flattenTree<T>(childArray, key));
    });
    return flat;
}

/**
 * Groups an array of items into multiple arrays,
 * grouped by a common property
 * @param array All properties
 */
export function groupArrayByProperty<T = any>(array: T[], propertyName: string): T[][] {
    const sorted: T[][] = [];

    // Get an array with the relation names and remove dublicates
    let uniqueValues: string[] = array.map((item) => {
        let value = (item as any)[propertyName];
        if (typeof value === 'string') {
            value = value.toLocaleLowerCase();
        }
        return value;
    }).filter((val) => !!val && val.length > 0);
    uniqueValues = removeDuplicates(uniqueValues);

    // For each property, push in it's related items
    uniqueValues.forEach((propertyValue) => {
        sorted.push(array.filter((item) => (item as any)[propertyName] === propertyValue));
    });

    return sorted;
}

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
export function isObject(obj: any): boolean {
    return obj !== null && typeof obj === 'object';
}

/**
 * Creates and returns a new array, clearing
 * duplicates with new Set().
 * @param val The array to remove duplicates from
 *
 * @returns An edited copy of @param val
 */
export function removeDuplicates<T = any>(val: T[]): T[] {
    return Array.from(new Set(val));
}
