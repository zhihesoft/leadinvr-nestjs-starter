import { Injectable } from "@nestjs/common";
import { CacheService } from "./cache.service";

@Injectable()
export class CacheRevokeTokenService {
    constructor(private readonly cache: CacheService) {}

    /**
     * 撤销已发出的Token
     * @param token
     */
    async revokeToken(token: string) {
        const key = `revoketokens:${token}`;
        const ttl = 30 * 60;
        await this.cache.set(key, "true", ttl);
    }

    /**
     * 是否是已经撤销的Token
     * @param token
     */
    async isTokenRevoked(token: string): Promise<boolean> {
        const key = `revoketokens:${token}`;
        return await this.cache.has(key);
    }
}
