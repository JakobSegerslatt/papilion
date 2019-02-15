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
