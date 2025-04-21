import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JWTGuardModuleOptions } from "../lib/jwt.guard.module.options";

@Injectable()
export class JWTSignService {
    constructor(private readonly jwts: JwtService, private options: JWTGuardModuleOptions) {}

    /**
     * sign token
     * @param userid user id
     * @param roles user roles
     * @param expiresIn expiration time, default is 30m
     * @returns token string
     */
    async sign(userid: number, roles: number, expiresIn: string = "30m"): Promise<string> {
        return await this.jwts.signAsync({ sub: String(userid), roles }, { expiresIn });
    }

    /**
     * Get secret
     */
    get secret(): string {
        return this.options.secret!;
    }
}
