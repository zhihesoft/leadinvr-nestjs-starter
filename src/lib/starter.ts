import figlet from "figlet";
import "source-map-support/register";

import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import * as bodyParser from "body-parser";

import { getPackageVersion } from "@leadinvr/common";
import { WinstonLogger } from "@leadinvr/logger";
import helmet from "helmet";
import { StarterOption } from "./starter.option";

async function getFigletText(name: string, version: string): Promise<string> {
    return new Promise((resolve, reject) => {
        figlet(`${name} ${version}`, (err: Error | null, data?: string) => {
            if (err) {
                reject(err);
            } else {
                resolve(data ?? "");
            }
        });
    });
}

/**
 * 简化的启动函数
 * @param options
 */
export async function startup(module: any, opt: StarterOption) {
    const pkg = await getPackageVersion("./package.json");
    const figletText = await getFigletText(pkg.name, pkg.version);
    console.log(figletText);
    console.log("Port: ", process.env.PORT ?? 3000);

    const app = await NestFactory.create(module, { cors: opt.cors ?? true, logger: new WinstonLogger() });
    // Swagger setup
    if (process.env.NODE_ENV !== "production") {
        const config = new DocumentBuilder()
            .setTitle(`${pkg.name} API`)
            .setVersion(pkg.version)
            .setDescription(`${pkg.name} API description`)
            .addBearerAuth()
            .build();
        const documentFactory = () => SwaggerModule.createDocument(app, config);
        SwaggerModule.setup("api", app, documentFactory);
    }

    // enable shutdown hooks
    app.enableShutdownHooks();
    // allow proxy pass real ip of client
    app.getHttpAdapter().getInstance().enable("trust proxy");
    // add helmet
    app.use(helmet());
    // add body parser limit
    app.use(bodyParser.json({ limit: opt.bodyParserLimit ?? "1mb" }));

    if (opt.initCallback) {
        await opt.initCallback(app);
    }

    await app.listen(process.env.PORT ?? 3000);
}
