import { JWTGuardModuleOptions } from "./jwt.guard.module.options";

export class JWTGuardModuleAsyncOptions {
    isGlobal?: boolean;
    autoRegister?: boolean;
    imports?: any[];
    inject?: any[];
    useFactory?: (...args: any[]) => JWTGuardModuleOptions;
}
