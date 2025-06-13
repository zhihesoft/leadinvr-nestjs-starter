import { INestApplication } from "@nestjs/common";

export type InitFunction = (app: INestApplication) => Promise<void>;
