/**
 * Custom property decorator which helps store a property in session storage
 *
 * @example
 * @Storage() token: string;
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
