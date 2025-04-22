import "dotenv/config";

import { DynamicModule, Provider } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { CacheRevokeTokenService } from "../cache/lib/cache.revoke.token.service";
import { JwtAuthGuard } from "./lib/jwt.authguard";
import { JWTGuardModuleAsyncOptions } from "./lib/jwt.guard.module.async.options";
import { JWTGuardModuleOptions } from "./lib/jwt.guard.module.options";
import { JwtStrategy } from "./lib/jwt.strategy";
import { JWTSignService } from "./service/jwt.sign.service";

export class JwtGuardModule {
    /**
     * Register
     * @param options
     * @returns
     */
    static register(options: JWTGuardModuleOptions): DynamicModule {
        const providers: Provider[] = [
            JwtAuthGuard,
            JwtStrategy,
            JWTSignService,
            CacheRevokeTokenService,
            {
                provide: JWTGuardModuleOptions,
                useValue: options,
            },
        ];
        if (options.autoRegister) {
            providers.push({ provide: APP_GUARD, useClass: JwtAuthGuard });
        }

        return {
            global: options.isGlobal || true,
            module: JwtGuardModule,
            providers,
            imports: [JwtModule.register({ secret: options.secret, global: true })],
            exports: [JwtAuthGuard, JWTSignService, JWTGuardModuleOptions],
        };
    }

    /**
     * Register
     * @param options
     * @returns
     */
    static registerAsync(options: JWTGuardModuleAsyncOptions): DynamicModule {
        const providers: Provider[] = [JwtAuthGuard, JwtStrategy, JWTSignService, CacheRevokeTokenService];
        if (options.useFactory) {
            providers.push({
                provide: JWTGuardModuleOptions,
                useFactory: options.useFactory,
                inject: options.inject || [],
            });
        }
        if (options.autoRegister) {
            providers.push({ provide: APP_GUARD, useClass: JwtAuthGuard });
        }

        return {
            global: options.isGlobal || true,
            module: JwtGuardModule,
            providers,
            imports: [
                JwtModule.registerAsync({
                    global: true,
                    imports: options.imports || [],
                    inject: [JWTGuardModuleOptions],
                    useFactory: async (op: JWTGuardModuleOptions) => {
                        return {
                            secret: op.secret,
                        };
                    },
                }),
            ],
            exports: [JwtAuthGuard, JWTSignService, JWTGuardModuleOptions],
        };
    }
}
