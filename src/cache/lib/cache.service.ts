import { Inject, Injectable, Logger, OnModuleDestroy } from "@nestjs/common";
import Redis from "ioredis";
import { CACHE_MODULE_OPTIONS } from "./cache.module.constants";
import { CacheModuleOptions } from "./cache.module.options";

@Injectable()
export class CacheService implements OnModuleDestroy {
    constructor(@Inject(CACHE_MODULE_OPTIONS) private readonly options: CacheModuleOptions) {
        const url: string | undefined = options.redisUri;
        if (url && url.length > 0) {
            this.redis = new Redis(url);
        } else {
            logger.warn(`Redis uri is not set, cache service is disabled`);
        }
    }

    onModuleDestroy() {
        this.redis?.quit();
    }

    get disabled(): boolean {
        return !this.redis;
    }

    private readonly redis?: Redis;

    /**
     * get or set key value
     * @param key key
     * @param ttl ttl in seconds or string like 10m, 1h, 1d
     * @param callback if key not exists, call this callback to get value, then save to cache
     * @returns T
     */
    async getOrSet<T>(key: string, ttl: number | string | undefined, callback: () => Promise<T>): Promise<T> {
        if (await this.has(key)) {
            return (await this.get<T>(key)) as T;
        }

        const data = await callback();
        return await this.set(key, data, ttl);
    }

    /**
     * try to get key value
     * @param key key
     * @returns
     */
    async get<T>(key: string): Promise<T | undefined> {
        return await this.getValue<T>(key);
    }

    /**
     * set key value
     * @param key key
     * @param value value
     * @param ttl ttl in seconds
     * @returns
     */
    async set<T>(key: string, value: T, ttl?: number | string): Promise<T> {
        await this.setValue(key, value, ttl);
        return value;
    }

    /**
     * Remove a key
     * @param key
     */
    async remove(key: string): Promise<void> {
        if (!this.redis) {
            return;
        }
        if (key.includes("*") || key.includes("?")) {
            await this.removeAll(key);
        } else {
            key = this.getKey(key);
            await this.redis.del(key);
        }
    }

    /**
     * Remove keys by pattern
     * @param keyPattern
     */
    async removeAll(keyPattern: string): Promise<void> {
        if (!this.redis) {
            return;
        }
        const key = this.getKey(keyPattern);
        const keys = await this.redis.keys(key);
        await Promise.all(keys.map(k => this.redis!.del(k)));
    }

    /**
     * Key value exists
     * @param key
     * @returns
     */
    async has(key: string): Promise<boolean> {
        if (!this.redis) {
            return false;
        }
        const ret = await this.getValue(key);
        return !!ret;
    }

    private getKey(key: string): string {
        return `${this.options.workspace ?? "workspace"}:${key}`;
    }

    private async setValue(key: string, value: any, seconds?: number | string): Promise<void> {
        if (!this.redis) {
            return;
        }

        key = this.getKey(key);
        const data = { value };
        const json = JSON.stringify(data);
        if (seconds) {
            if (typeof seconds === "string") {
                // parse string like 10m, 1h, 1d to seconds number
                const match = seconds.match(/(\d+)([mhd])/);
                if (!match) {
                    throw new Error(`Invalid ttl string: ${seconds}`);
                }
                const num = parseInt(match[1]);
                const unit = match[2];
                switch (unit) {
                    case "m":
                        seconds = num * 60;
                        break;
                    case "h":
                        seconds = num * 60 * 60;
                        break;
                    case "d":
                        seconds = num * 60 * 60 * 24;
                        break;
                    case "s":
                        seconds = num;
                        break;
                    case "w":
                        seconds = num * 60 * 60 * 24 * 7;
                        break;
                    default:
                        throw new Error(`Invalid ttl unit: ${unit}`);
                }
            }
            await this.redis!.setex(key, seconds, json);
        } else {
            await this.redis!.set(key, json);
        }
    }

    private async getValue<T>(key: string): Promise<T | undefined> {
        if (!this.redis) {
            return undefined;
        }
        key = this.getKey(key);
        const data = await this.redis!.get(key);
        if (!data) {
            return undefined;
        }
        const json = JSON.parse(data);
        return json.value as T;
    }
}

const logger = new Logger(CacheService.name);
