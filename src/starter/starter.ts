import figlet from "figlet";
import { getPackageVersion } from "../common/lib/package.info";

export class StarterOption {
}

export function startup(options: StarterOption) {
    bootstrap();
}

async function bootstrap() {
    const pkg = await getPackageVersion("./package.json");
    figlet(`${pkg.name} ${pkg.version}`, (err: Error | null, data?: string) => {
        if (err) {
            console.error("Something went wrong...");
            console.error(err);
            return;
        }
        console.log(data);
        console.log("Port: ", process.env.PORT ?? 3000);
        main().catch(console.error);
    });
}

async function main() {}

startup({});
