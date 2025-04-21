import * as fs from "fs";

/**
 * Gets the version and name of a package from its package.json file.
 * @param packageFilePath Path to the package.json file
 * @returns
 */
export async function getPackageVersion(packageFilePath: string): Promise<{ version: string; name: string }> {
    const json = fs.readFileSync(packageFilePath, "utf-8");
    const obj = JSON.parse(json); // Validate JSON format
    return obj;
}
