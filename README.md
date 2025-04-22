# Starter for NestJS

starter module for nestjs

<p align="center">
  <a href="https://www.npmjs.com/package/@leadinvr/nestjs-starter">
    <img src="https://img.shields.io/npm/v/@leadinvr/nestjs-starter.svg?style=for-the-badge" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/@leadinvr/nestjs-starter">
    <img src="https://img.shields.io/npm/dt/@leadinvr/nestjs-starter.svg?style=for-the-badge" alt="npm total downloads" />
  </a>
  <a href="https://www.npmjs.com/package/@leadinvr/nestjs-starter">
    <img src="https://img.shields.io/npm/dm/@leadinvr/nestjs-starter.svg?style=for-the-badge" alt="npm monthly downloads" />
  </a>
  <a href="https://www.npmjs.com/package/@leadinvr/nestjs-starter">
    <img src="https://img.shields.io/npm/l/@leadinvr/nestjs-starter.svg?style=for-the-badge" alt="npm license" />
  </a>
</p>

# Quick Start

-   Install

```bash
npm i @leadinvr/nestjs-starter
```

-   Usage

```ts
startup({
    imports: [SomeModule ...],
    controllers: [SomeController ...],
    providers: [SomeProvider ...]
})
```

# Modules

## Common Module

### Utils

-   wait for seconds

```ts
/**
 * Wait for seconds
 * @param seconds
 * @returns
 */
export async function waitForSeconds(seconds: number): Promise<void>;
```

-   Bypass compile warning for unused parameters

```ts
/**
 * Bypass TypeScript error for unused parameters
 * @param parameters
 */
export function forgot(...parameters: unknown[]);
```

-   Generate a random length string

```ts
/**
 * Generate a random string of given length
 * @param length Length of the string to generate
 * @returns Random string
 */
export function randomString(length: number): string'
```

-   Normalize number in a spec range

```ts
/**
 * Normalize a number to be within a specified range. [min, max]
 * If the number is less than the minimum, it will return the minimum.
 * If the number is greater than the maximum, it will return the maximum.
 * If the number is within the range, it will return the number itself.
 */
export function normalizeNumber(value: number, min: number, max: number): number;
```

### String utils

-   Replace all in string

```ts
/**
 * Replace all occurrences of a string in another string with a new string.
 * This function uses the String.prototype.replaceAll method to replace all occurrences of a substring with a new string.
 * @param value
 * @param pairs
 * @returns
 */
export function replaceString(value: string, ...pairs: string[][]): string;
```

-   Split string

```ts
/**
 * Split a string by multiple delimiters
 * This function replaces all occurrences of the specified delimiters with a unique string and then splits the string by that unique string.
 * @param value
 * @param splitter
 * @returns
 */
export function splitString(value: string, ...splitter: string[]): string[];
```

-   Unescape HTML entity

```ts
/**
 * Unescape HTML entities in a string
 * This function replaces HTML entities with their corresponding characters.
 * @param htmlEntity String to unescape
 * @returns Unescaped string
 */
export function unescapeHTML(htmlEntity: string): string;
```

### Failed

-   Fire exception when condition is truely

```ts
Failed.on(condition, `messages ...`);
Failed.on(condition, () => `messages ...`);
Failed.on(condition, () => new Error());
```

-   Fire exception when condition is falsy

```ts
Failed.onFalsy(condition, `messages ...`);
Failed.onFalsy(condition, () => `messages ...`);
Failed.onFalsy(condition, () => new Error());
```

## Crypto

```ts
@Injectable()
export class CryptoService {
    /**
     * User bcrytp to hash password
     * @param password
     * @returns hashed password
     */
    async bcryptHash(password: string): Promise<string>;

    /**
     * Compare password with hashed password
     * @param password password
     * @param hashedPassword hashed password (store in db)
     * @returns identical return true, otherwise return false
     */
    async bcryptCompare(password: string, hashedPassword: string): Promise<boolean>;

    /**
     * Generate md5 hash
     * @param str
     * @returns
     */
    md5(str: string): string;

    /**
     * Generate sha256 hash
     * @param str
     * @param secret
     * @returns
     */
    hmacSHA256(str: string, secret: string): string;

    /**
     * Buffer to base64 encode
     * @param buffer Buffer to encode
     * @returns
     */
    base64Encode(buffer: Buffer): string;

    /**
     * Base64 decode to buffer
     * @param str Base64 string to decode
     * @returns Buffer
     */
    base64Decode(str: string): Buffer;

    /**
     * Generate a random string of given length
     * @param length Length of the string to generate
     * @returns Random string
     */
    randomString(length: number): string;
}
```

### Get package info from package.json

```ts
/**
 * Gets the version and name of a package from its package.json file.
 * @param packageFilePath Path to the package.json file
 * @returns
 */
async function getPackageVersion(packageFilePath: string): Promise<{ version: string; name: string }>;
```

