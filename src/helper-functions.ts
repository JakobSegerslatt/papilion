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

export function createGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        // tslint:disable-next-line:no-bitwise
        const r = (Math.random() * 16) | 0;
        // tslint:disable-next-line:no-bitwise
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export function contains(x: string, y: string): boolean {
    x = x || '';
    y = y || '';
    return x.toLowerCase().includes(y.toLowerCase());
}

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

// A value can be 0, false, but not an empty string, null or undefined
export function isNotNullorEmpty(v: any): boolean {
    return v !== undefined && v !== '' && v !== null;
}

export function isObject(obj: any) {
    return obj !== null && typeof obj === 'object';
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

export function removeDuplicates<T = any>(val: T[]): T[] {
    return Array.from(new Set(val));
}

export function reverseEnum(obj: any, value: any): any {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] === value) {
                return key;
            }
        }
    }
}

/**
 * Custom property decorator which helps store a property in session storage
 *
 * e.g. @Storage() token: string;
 */
export function Storage(name?: string) {
    return ((target: any, key: string) => {
        const storageKey = name || key;
        Object.defineProperty(target, key, {
            configurable: false,
            get: () => sessionStorage.getItem(storageKey),
            set: (val: any) => sessionStorage.setItem(storageKey, val)
        });
    });
}

export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
    if (parentModule) {
        throw new Error(`${moduleName} has already been loaded.
        Import Core modules in the AppModule only.`);
    }
}

export function trimString(s: string, count = 1): string {
    return s.substr(0, s.length - count);
}
