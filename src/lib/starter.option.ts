import { INestApplication } from "@nestjs/common";

/**
 * StarterOption interface for configuring the NestJS application.
 * It includes options for body parser limit, CORS, and an initialization function.
 */
export class StarterOption {
    /**
     * The limit for the body parser, default is "1mb".
     * This can be overridden by providing a different value.
     */
    bodyParserLimit: string = "1mb";

    /**
     * A boolean indicating whether to enable CORS. Default is true.
     * If set to false, CORS will not be enabled for the application.
     */
    cors: boolean = true;

    /**
     * An optional initialization function that takes an INestApplication instance.
     * This function can be used to perform additional setup or configuration
     * after the application has been created but before it starts listening for requests.
     */
    initCallback?: (app: INestApplication) => Promise<void>;
}
