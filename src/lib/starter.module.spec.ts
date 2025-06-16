import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { StarterModule } from "./starter.module";

describe("starter module", () => {
    let app: INestApplication;
    let moduleRef: TestingModule;
    // const redisUri = "redis://127.0.0.1:6379";
    const redisUri = "";

    beforeAll(async () => {
        moduleRef = await Test.createTestingModule({
            imports: [
                StarterModule.registerAsync({
                    useFactory: () => ({
                        redisUrl: redisUri,
                        redisTTL: 10,
                        redisWorkspace: "starter-test",
                        jwtSecret: "jwt-secret",
                        jwtIssuer: "jwt-issuer",
                        jwtAudience: "jwt-audience",
                    }),
                }),
            ],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await moduleRef.close();
    });

    it("should be defined", () => {
        expect(app).toBeDefined();
    });
    // let catsService = { findAll: () => ['test'] };
    // redis://127.0.0.1:6379
});
