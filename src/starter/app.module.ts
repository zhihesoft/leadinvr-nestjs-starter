import "dotenv/config";

import { DynamicModule } from "@nestjs/common";
import { CacheModule } from "../cache/cache.module";
import { CacheRevokeTokenService } from "../cache/lib/cache.revoke.token.service";
import { CommonModule } from "../common/common.module";
import { PackageInfoDto } from "../common/domain/package.info.dto";
import { JwtGuardModule } from "../jwt.guard/jwt.guard.module";
import { LoggerModule } from "../logger/logger.module";
import { AppOption } from "./starter";

export class AppModule {
    static register(pkg: PackageInfoDto, options: AppOption): DynamicModule {
        return {
            module: AppModule,
            imports: [
                CommonModule,
                LoggerModule.register(true),
                CacheModule.register({ global: true, redisUri: process.env.REDIS_URI ?? "", workspace: pkg.name }),
                JwtGuardModule.registerAsync({
                    isGlobal: true,
                    autoRegister: true,
                    inject: [CacheRevokeTokenService],
                    useFactory: (revokes: CacheRevokeTokenService) => ({
                        secret: process.env.JWT_SECRET,
                        checker: async token => {
                            const result = await revokes.isTokenRevoked(token);
                            return !result;
                        },
                    }),
                }),
                ...(options.imports ?? []),
            ],
            providers: options.providers ?? [],
            controllers: options.controllers ?? [],
        };
    }
}
