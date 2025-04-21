import { DynamicModule, Provider } from "@nestjs/common";
import { CacheModuleAsyncOptions } from "./lib/cache.module.async.options";
import { CACHE_MODULE_OPTIONS } from "./lib/cache.module.constants";
import { CacheModuleOptions } from "./lib/cache.module.options";
import { CacheRevokeTokenService } from "./lib/cache.revoke.token.service";
import { CacheService } from "./lib/cache.service";

export class CacheModule {
    static register(options: CacheModuleOptions): DynamicModule {
        return {
            global: options.global || true,
            module: CacheModule,
            providers: [
                {
                    provide: CACHE_MODULE_OPTIONS,
                    useValue: options,
                },
                CacheService,
                CacheRevokeTokenService,
            ],
            exports: [CacheService, CacheRevokeTokenService],
        };
    }

    /**
     * Async register
     * @param options
     * @returns
     */
    static registerAsync(options: CacheModuleAsyncOptions): DynamicModule {
        const providers: Provider[] = [];

        if (options.useFactory) {
            providers.push({
                provide: CACHE_MODULE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            });
        }

        providers.push(CacheService, CacheRevokeTokenService);

        return {
            global: options.global || true,
            module: CacheModule,
            imports: options.imports || [],
            providers,
            exports: [CacheService, CacheRevokeTokenService],
        };
    }
}
