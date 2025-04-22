import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { CacheModule } from "./cache.module";
import { CacheService } from "./lib/cache.service";

describe("CacheModule", () => {
    let app: INestApplication;
    // let catsService = { findAll: () => ['test'] };

    it("register", async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [CacheModule.register({ global: true, redisUri: "", workspace: "test" })],
        }).compile();
        const svc = moduleRef.get(CacheService);
        expect(svc.disabled).toBe(true);
        moduleRef.close();
    });
});
