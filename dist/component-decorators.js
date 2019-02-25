"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Custom property decorator which helps store a property in session storage
 *
 * @example
 * @Storage() token: string;
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
//# sourceMappingURL=component-decorators.js.map