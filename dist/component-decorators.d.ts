/**
 * Custom property decorator which helps store a property in session storage
 *
 * @example
 * @Storage() token: string;
 */
export declare function Storage(name?: string): (target: any, key: string) => void;
