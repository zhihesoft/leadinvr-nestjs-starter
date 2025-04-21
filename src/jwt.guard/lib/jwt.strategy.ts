import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWTGuardModuleOptions } from "./jwt.guard.module.options";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly options: JWTGuardModuleOptions) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            passReqToCallback: true,
            secretOrKey: options.secret!,
        });
    }

    async validate(req: Request, payload: unknown): Promise<unknown> {
        const token = this.getToken(req);
        if (!token) {
            throw new UnauthorizedException("Token is missing");
        }
        if (this.options.checker) {
            const pass = await this.options.checker(token);
            if (!pass) {
                throw new UnauthorizedException("Token is revoked");
            }
        }
        return payload;
    }

    private getToken(req: Request): string | undefined {
        const authheader = req.headers["authorization"];
        if (!authheader) {
            return undefined;
        }
        const token = authheader.split(" ")[1];
        return token;
    }
}
