import { CryptoService } from "./crypto.service";

describe("crypto.service", () => {
    let cryptoService: CryptoService;
    beforeAll(async () => {
        cryptoService = new CryptoService();
    });

    describe("bcryptHash", () => {
        it("should hash password", async () => {
            const password = "123456";
            const hashedPassword = await cryptoService.bcryptHash(password);
            expect(hashedPassword).not.toBe(password);
            expect(hashedPassword).toMatch(/^\$2[ayb]\$.{56}$/);
        });
    });

    describe("bcryptCompare", () => {
        it("should compare password with hashed password", async () => {
            const password = "123456";
            const hashedPassword = await cryptoService.bcryptHash(password);
            const isMatch = await cryptoService.bcryptCompare(password, hashedPassword);
            expect(isMatch).toBe(true);
            const isNotMatch = await cryptoService.bcryptCompare("wrongpassword", hashedPassword);
            expect(isNotMatch).toBe(false);
        });
    });

    describe("md5", () => {
        it("should generate md5 hash", () => {
            const str = "hello world";
            const hash = cryptoService.md5(str);
            expect(hash).toBe("5eb63bbbe01eeed093cb22bb8f5acdc3");
        });
    });

    describe("hmacSHA256", () => {
        it("should generate hmacSHA256 hash", () => {
            const str = "Hello World";
            const hash = cryptoService.hmacSHA256(str, "secret");
            expect(hash).toBe("gs4NL4IfoM5UR7ITBvIUyZJA/sxjh3eddRUUi73QxBU=");
        });
    });

    describe("base64Encode", () => {
        it("should encode buffer to base64", () => {
            const buffer = Buffer.from("hello world");
            const base64 = cryptoService.base64Encode(buffer);
            expect(base64).toBe("aGVsbG8gd29ybGQ=");
        });
    });

    describe("base64Decode", () => {
        it("should decode base64 to buffer", () => {
            const base64 = "aGVsbG8gd29ybGQ=";
            const buffer = cryptoService.base64Decode(base64);
            expect(buffer.toString()).toBe("hello world");
        });
    });

    describe("randomString", () => {
        it("should generate random string", () => {
            const length = 16;
            const randomStr = cryptoService.randomString(length);
            expect(randomStr.length).toBe(length);
        });
    });
});
