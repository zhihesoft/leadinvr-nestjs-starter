import { Injectable } from "@nestjs/common";
import { JWTCheckCallback } from "./jwt.check.callback";

@Injectable()
export class JWTGuardModuleOptions {
    /**
     * Auto register JWT Guard, default is true
     */
    isGlobal?: boolean;
    /**
     * Auto register JWT Guard, default is true
     */
    autoRegister?: boolean;
    /**
     * JWT Secret, if not set, will use the default random secret from JWT module
     */
    secret?: string;

    /**
     * Token checker
     */
    checker?: JWTCheckCallback;
}
