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

## Register

```ts
CacheModule.register(
    {
        uri: "redis://localhost",
        workspace: "demo",
    },
    /* is global register */
    true,
);
```

## Async register

```ts
CacheModule.registerAsync({
    isGlobal: true /* Default is true */,
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configs: ConfigService) => ({
        uri: configs.get("REDIS_URL"),
        workspace: "demo",
    }),
});
```

## Use cache in controller

-   Normal

```ts
@Cached("demo")
@Get("demo/sub")
async getSubjects(): Promise<string[]> {
    return await this.configurations.getSubjects();
}
```

-   With query parameters, Cached tag end with ":"

```ts
@Cached("demo:data:", "10m")
@Get("demo/data")
async getData2(@Query("name") name: string): Promise<CommonResponseDto> {
    const xml = await this.graphs.lanes.getLaneXML(name);
    return CommonResponseDto.succ(xml);
}

```

-   Revoke cache, tag can be key or with \* to match all keys

```ts
@RevokeCache("demo:*")
@Delete("demo/remove")
async remove(@Query("name") name: string) {
    await this.graphs.lanes.remove(name);
    return CommonResponseDto.succ();
}
```

## Cache api

### CacheService

```ts
    /**
     * get or set key value if not exist
     * @param key key
     * @param ttl ttl in seconds or string like 10m, 1h, 1d
     * @param callback if key not exists, call this callback to get value, then save to cache
     * @returns T
     */
    async getOrSet<T>(
        key: string,
        ttl: number | string | undefined,
        callback: () => Promise<T>
    ): Promise<T>
```

```ts
    /**
     * try to get key value
     * @param key key
     * @returns
     */
    async get<T>(key: string): Promise<T | undefined>
```

```ts
    /**
     * set key value
     * @param key key
     * @param value value
     * @param ttl ttl in seconds
     * @returns
     */
    async set<T>(key: string, value: T, ttl?: number | string): Promise<T>
```

```ts
    /**
     * Remove a key
     * @param key 
     */
    async remove(key: string): Promise<void>
```

```ts
    /**
     * Remove keys by pattern
     * @param keyPattern 
     */
    async removeAll(keyPattern: string): Promise<void>
```

```ts
    /**
     * Key value exists
     * @param key
     * @returns
     */
    async has(key: string): Promise<boolean>
```