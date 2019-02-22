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

/**
 * @returns A copy of @param obj
 * It can be an array, object, class or primitive type.
 */
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
export function findKeyForValue(obj: any, value: any): string | number | undefined {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] === value) {
                return key;
            }
        }
    }
}

/**
 * Checks if @param obj is not null and is an object.
 */
export function isObject(obj: any): boolean {
    return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
}
