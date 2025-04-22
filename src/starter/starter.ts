import figlet from "figlet";
import "source-map-support/register";

import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import * as bodyParser from "body-parser";

import { Provider } from "@nestjs/common";
import helmet from "helmet";
import { PackageInfoDto } from "../common/domain/package.info.dto";
import { getPackageVersion } from "../common/lib/package.info";
import { WinstonLogger } from "../logger/lib/common.logger";
import { AppModule } from "./app.module";

export class AppOption {
    bodyParserLimit?: string;
    imports?: any[];
    providers?: Provider[];
    controllers?: any[];
}

export function startup(options: AppOption) {
    bootstrap(options);
}

async function bootstrap(options: AppOption) {
    const pkg = await getPackageVersion("./package.json");
    figlet(`${pkg.name} ${pkg.version}`, (err: Error | null, data?: string) => {
        if (err) {
            console.error("Something went wrong...");
            console.error(err);
            return;
        }
        console.log(data);
        console.log("Port: ", process.env.PORT ?? 3000);
        main(pkg, options).catch(console.error);
    });
}

async function main(pkg: PackageInfoDto, options: AppOption) {
    const app = await NestFactory.create(AppModule.register(pkg, options), { cors: true, logger: new WinstonLogger() });

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
    app.use(bodyParser.json({ limit: options.bodyParserLimit ?? "5mb" }));

    await app.listen(process.env.PORT ?? 3000);
}

startup({});
