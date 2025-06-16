import "dotenv/config";

import { CacheModule } from "@leadinvr/cache";
import { CommonModule } from "@leadinvr/common";
import { JwtGuardModule } from "@leadinvr/jwt-guard";
import { LoggerModule } from "@leadinvr/logger";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        CommonModule,
        LoggerModule,
        CacheModule.register({
            isGlobal: true,
            redisUrl: process.env.REDIS_URI ?? "",
            workspace: process.env.WORKSPACE ?? "default",
            ttl: Number(process.env.CACHE_TTL) ?? 10, // 10s
        }),
        JwtGuardModule.register({
            redisUrl: process.env.REDIS_URI ?? "",
            secret: process.env.JWT_SECRET ?? "default-secret",
            issuer: process.env.JWT_ISSUER ?? "default-issuer",
            audience: process.env.JWT_AUDIENCE ?? "default-audience",
        }),
    ],
})
export class StarterModule {}
