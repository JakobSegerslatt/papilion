
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
 * @returns a random entry from a an array
 *
 * Based on Math.random()
 * @param array The array from which you want a random entry
 * @param arrayToPopulate Optional. If provided, the function checks that
 * the returned entry is not already in the arrayToPopulate.
 * @param tryCount The amount of times the function should try to return a unique
 * value (since this method is recursive). Defaults to 5.
 */
export function getRandomEntry<T>(array: T[], arrayToPopulate?: T[], tryCount?: number): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomEntry = array[randomIndex];

    /**
     * If arrayToPopulate is provided; run this method again.
     * Repeat until the maxium amount of tries has been done
     * so we avoid getting stuck in an infinite loop
     * (which could happen if @param array only has a single entry)
     */
    tryCount = tryCount || 5;
    if (tryCount > 0 && arrayToPopulate && arrayToPopulate.includes(randomEntry)) {
        tryCount--;
        return getRandomEntry(array, arrayToPopulate);
    }

    return randomEntry;
}

/**
 * Groups an array of items into multiple arrays,
 * grouped by a common property
 * @param array All properties
 */
export function groupArrayByProperty<T = any>(
    array: T[],
    key: string | ((s: T) => string | number)
): T[][] {
    const grouped: T[][] = [];

    // Get an array with the relation names and remove dublicates
    let uniqueValues: string[] = array.map((item) => {
        let value = (key instanceof Function ? key(item) : (item as any)[key]);
        if (typeof value === 'string') {
            value = value.toLocaleLowerCase();
        }
        return value;
    }).filter((val) => (!!val && val.length > 0) || typeof val === 'number');
    uniqueValues = removeDuplicates(uniqueValues);

    // For each property, push in it's related items
    uniqueValues.forEach((propertyValue) => {
        grouped.push(array.filter((item) =>
            (key instanceof Function ? key(item) : (item as any)[key]) === propertyValue));
    });

    return grouped;
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
 * Creates and returns a new array, clearing
 * duplicates with new Set().
 * @param val The array to remove duplicates from
 *
 * @returns An edited copy of @param val
 */
export function removeDuplicates<T = any>(val: T[]): T[] {
    return Array.from(new Set(val));
}
