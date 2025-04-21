import { getPackageVersion } from "./package.info";

test("packageVersion", async () => {
    const packageFilePath = "./package.json"; // Adjust the path as needed
    const data = await getPackageVersion(packageFilePath);
    expect(data).toHaveProperty("version");
    expect(data.name).toBe("@leadinvr/nestjs-starter"); // Replace with the actual package name
});
