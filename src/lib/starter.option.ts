import { INestApplication } from "@nestjs/common";

/**
 * StarterOption interface for configuring the NestJS application.
 * It includes options for body parser limit, CORS, and an initialization function.
 */
export class StarterOption {
    bodyParserLimit?: string;
    cors?: boolean;
    jwtCheck?: 
    initFunction?: (app: INestApplication) => Promise<void>;
}
