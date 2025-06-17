/**
 * StarterOption interface for configuring the NestJS application.
 * It includes options for body parser limit, CORS, and an initialization function.
 */
export class StarterModuleOptions {
    /**
     * The URL for the Redis server.
     */
    redisUrl: string = "";

    /**
     * The workspace name for Redis, default is "default".
     */
    redisWorkspace?: string = "default";

    /**
     * The secret for JWT tokens.
     */
    jwtSecret: string = "jwt-secret";

    /**
     * The issuer for JWT tokens.
     */
    jwtIssuer?: string = "jwt-issuer";

    /**
     * The audience for JWT tokens.
     */
    jwtAudience?: string = "jwt-audience";
}
