
/**
 * Bypass TypeScript error for unused parameters
 * @param parameters
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function forgot(...parameters: unknown[]) {}

/**
 * Wait for seconds
 * @param seconds
 * @returns
 */
export async function waitForSeconds(seconds: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(undefined);
        }, seconds * 1000);
    });
}

/**
 * Normalize a number to be within a specified range. [min, max]
 * If the number is less than the minimum, it will return the minimum.
 * If the number is greater than the maximum, it will return the maximum.
 * If the number is within the range, it will return the number itself.
 * @param value
 * @param min
 * @param max
 * @returns Normalized number
 */
export function normalizeNumber(value: number, min: number, max: number): number {
    if (value < min) {
        return min;
    } else if (value > max) {
        return max;
    } else {
        return value;
    }
}
