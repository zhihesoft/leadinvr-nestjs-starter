import "dotenv/config";

import { CacheModule } from "@leadinvr/cache";
import { CommonModule, getPackageVersion } from "@leadinvr/common";
import { JwtGuardModule } from "@leadinvr/jwt-guard";
import { LoggerModule } from "@leadinvr/logger";
import { DynamicModule, Global, Module } from "@nestjs/common";
import { ASYNC_OPTIONS_TYPE, STARTER_OPTION_TOKEN, StarterModuleClass } from "./starter.module-defination";
import { StarterModuleOptions } from "./starter.module.options";

@Global()
@Module({
    imports: [CommonModule, LoggerModule],
})
export class StarterModule extends StarterModuleClass {
    /**
     * Static register method for the StarterModule.
     * @param options - The options to configure the module.
     * @returns A DynamicModule instance.
     */
    static register(options: StarterModuleOptions): DynamicModule {
        const pkgInfo = getPackageVersion("./package.json");
        const m = super.register(options);
        m.imports ??= [];
        m.imports.push(
            CacheModule.register({
                redisUrl: options.redisUrl,
                workspace: options.redisWorkspace ?? pkgInfo.name,
            }),
            JwtGuardModule.register({
                isGlobal: true,
                redisUrl: options.redisUrl,
                secret: options.jwtSecret,
                issuer: options.jwtIssuer ?? pkgInfo.name,
                audience: options.jwtAudience ?? pkgInfo.name,
            }),
        );
        return m;
    }

    /**
     * Async register method for the StarterModule.
     * @param options
     * @returns
     */
    static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
        const pkgInfo = getPackageVersion("./package.json");
        const m = super.registerAsync(options);
        m.imports ??= [];
        m.imports.push(
            CacheModule.registerAsync({
                isGlobal: true,
                useFactory: async (option: StarterModuleOptions) => ({
                    redisUrl: option.redisUrl,
                    workspace: option.redisWorkspace ?? pkgInfo.name,
                }),
                inject: [STARTER_OPTION_TOKEN],
                provideInjectionTokensFrom: m.providers,
            }),
            JwtGuardModule.registerAsync({
                useFactory: async (option: StarterModuleOptions) => {
                    return {
                        isGlobal: true,
                        redisUrl: option.redisUrl,
                        secret: option.jwtSecret,
                        issuer: option.jwtIssuer ?? pkgInfo.name,
                        audience: option.jwtAudience ?? pkgInfo.name,
                    };
                },
                inject: [STARTER_OPTION_TOKEN],
                provideInjectionTokensFrom: m.providers,
            }),
        );
        return m;
    }
}
