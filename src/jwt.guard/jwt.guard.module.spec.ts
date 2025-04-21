import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { JwtGuardModule } from "./jwt.guard.module";
import { JWTSignService } from "./service/jwt.sign.service";

describe("jwt.guard.module register", () => {
    let app: INestApplication;
    // let catsService = { findAll: () => ['test'] };

    it("register", async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                JwtGuardModule.register({
                    isGlobal: true,
                    autoRegister: false,
                    secret: "test",
                }),
            ],
        }).compile();
        const svc = moduleRef.get(JWTSignService);
        expect(svc).toBeDefined();
        expect(svc.secret).toBe("test");
    });

    it("registerAsync", async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                JwtGuardModule.registerAsync({
                    useFactory: () => {
                        return {
                            isGlobal: true,
                            autoRegister: false,
                            secret: "test1",
                        };
                    },
                }),
            ],
        }).compile();
        const svc = moduleRef.get(JWTSignService);
        expect(svc).toBeDefined();
        expect(svc.secret).toBe("test1");
    });
});
